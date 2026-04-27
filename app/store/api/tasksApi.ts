import type { Task } from "~/types/workspace";
import { baseApi } from "./baseApi";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET TASKS
        getTasks: builder.query<Task[], string>({
            query: (projectId) => `/tasks/project/${projectId}/tasks`,

            transformResponse: (response: { success: boolean; data: Task[] }) => {
                return response.data;
            },

            providesTags: ["Tasks"],
        }),

        //  CREATE TASK
        createTask: builder.mutation({


            query: ({ projectId, ...body }) => ({
                url: `/tasks/project/${projectId}/tasks`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Tasks"],
        }),

    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
} = tasksApi;