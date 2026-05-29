import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getToken } from "~/api/authToken";

const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000"
).replace(/\/$/, "");

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/api`,
        prepareHeaders: async (headers) => {
            const token = await getToken();

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["Tasks", "Comments"],
    endpoints: () => ({}),
});
