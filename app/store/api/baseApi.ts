import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getToken } from "~/api/authToken";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        prepareHeaders: async (headers) => {
            const token = await getToken();

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["Tasks"],
    endpoints: () => ({}),
});