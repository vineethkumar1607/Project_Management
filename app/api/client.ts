import axios from "axios";
import { getToken } from "../api/authToken";

const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000"
).replace(/\/$/, "");

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        try {
            /**
             * Prevent infinite hanging
             */
            const token = await Promise.race([
                getToken(),
                new Promise<null>((resolve) =>
                    setTimeout(() => resolve(null), 5000)
                ),
            ]);

            if (token) {
                config.headers.Authorization =
                    `Bearer ${token}`;
            }

            return config;

        } catch (error) {
            console.error(
                "TOKEN FETCH ERROR:",
                error
            );

            return config;
        }
    },
    (error) => Promise.reject(error)
);
