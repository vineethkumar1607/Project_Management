import type { Task } from "~/types/workspace";
import { baseApi } from "./baseApi";
import type { TaskDetails,  } from "~/types/workspace";

type TaskComment = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
};

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

        //  CREATE TASK -  After creating a task, we want to refetch the list of tasks for the project to show the new task in the UI. The invalidatesTags: ["Tasks"] will trigger a refetch of any query that provides the "Tasks" tag, which in this case is our getTasks query.
        createTask: builder.mutation({


            query: ({ projectId, ...body }) => ({
                url: `/tasks/project/${projectId}/tasks`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Tasks"],
        }),
        // GET TASK DETAILS by ID with caching and automatic refetching when the task is updated (e.g., after a comment is added or task status changes). The providesTags and invalidatesTags ensure that the cache is properly managed.
        getTaskById: builder.query<TaskDetails, string>({
            query: (taskId) => `/tasks/${taskId}`,

            transformResponse: (response: { success: boolean; data: TaskDetails }) => {
                return response.data;
            },

            providesTags: (result, error, taskId) => [
                { type: "Tasks", id: taskId }
            ],
        }),

        //  COMMENTS RELATED ENDPOINTS (backend supports pagination with cursor)  
        //  For simplicity, we won't implement infinite scrolling here, but the structure allows for it in the future.
        getTaskComments: builder.query<
            { items: TaskComment[]; nextCursor: string | null },
            { taskId: string; cursor?: string }
        >({
            query: ({ taskId, cursor }) => ({
               url: `/tasks/${taskId}/comments`,  
                params: { cursor },
            }),

            serializeQueryArgs: ({ endpointName }) => endpointName,

            merge: (currentCache, newItems) => {
                currentCache.items.push(...newItems.items);
                currentCache.nextCursor = newItems.nextCursor;
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.taskId !== previousArg?.taskId;
            },
        }),

        //  Mutation to add a comment with optimistic update to the comments list in the UI without waiting for the server response. If the server call fails, the optimistic update will be rolled back.
        addComment: builder.mutation({
            query: ({ taskId, message }) => ({
              url: `/tasks/${taskId}/comments`,  
                method: "POST",
                body: { message },
            }),

            // Optimistic update to add the new comment to the UI immediately 
            async onQueryStarted({ taskId, message }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    tasksApi.util.updateQueryData(
                        "getTaskComments",
                        { taskId },
                        (draft) => {
                            draft.items.unshift({
                                id: Date.now().toString(),
                                content: message,
                                createdAt: new Date().toISOString(),
                                user: {
                                    id: "temp",
                                    name: "You",
                                },
                            });
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useGetTaskByIdQuery,
    useGetTaskCommentsQuery,
    useAddCommentMutation,
} = tasksApi;