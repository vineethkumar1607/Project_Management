import type { Task } from "~/types/workspace";
import { baseApi } from "./baseApi";
import type { TaskDetails, } from "~/types/workspace";

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

        // UPDATE TASK -  This mutation allows us to update specific fields of a task (like status, title, description, etc.) without needing to send the entire task object. The invalidatesTags: ["Tasks"] ensures that any cached data related to tasks is invalidated and refetched, keeping the UI in sync with the latest data from the server.
        updateTask: builder.mutation<
            { success: boolean; data: Task },
            { taskId: string; body: Partial<Task> }
        >({
            query: ({ taskId, body }) => ({
                url: `/tasks/${taskId}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Tasks"], // refresh list
        }),

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

            transformResponse: (response: {
                success: boolean;
                data: { items: TaskComment[]; nextCursor: string | null };
            }) => response.data,

            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${queryArgs.taskId}`;
            },

            merge: (currentCache, newItems) => {
                if (!currentCache.items) {
                    currentCache.items = [];
                }

                const existingIds = new Set(currentCache.items.map(c => c.id));

                const filteredNew = newItems.items.filter(c => !existingIds.has(c.id));

                currentCache.items.push(...filteredNew);
                currentCache.nextCursor = newItems.nextCursor;
            },

            forceRefetch({ currentArg, previousArg }) {
                return (
                    currentArg?.taskId !== previousArg?.taskId ||
                    currentArg?.cursor !== previousArg?.cursor
                );
            },

            providesTags: (result, error, { taskId }) => [
                { type: "Comments", id: taskId },
            ],
        }),

        //  Mutation to add a comment with optimistic update to the comments list in the UI without waiting for the server response. If the server call fails, the optimistic update will be rolled back.
        addComment: builder.mutation<
            any,
            {
                taskId: string;
                message: string;
                user: {
                    id: string;
                    name: string;
                    image?: string;
                };
            }
        >({
            query: ({ taskId, message }) => ({
                url: `/tasks/${taskId}/comments`,
                method: "POST",
                body: { message },
            }),

            async onQueryStarted({ taskId, message, user }, { dispatch, queryFulfilled }) {

                const tempId = `temp-${Date.now()}`;

                const patchResult = dispatch(
                    tasksApi.util.updateQueryData(
                        "getTaskComments",
                        { taskId, cursor: undefined },
                        (draft) => {
                            if (!draft?.items) return;

                            draft.items.push({
                                id: tempId,
                                content: message,
                                createdAt: new Date().toISOString(),
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    image: user.image,
                                },
                            });
                        }
                    )
                );

                try {
                    const { data: newComment } = await queryFulfilled;

                    dispatch(
                        tasksApi.util.updateQueryData(
                            "getTaskComments",
                            { taskId, cursor: undefined },
                            (draft) => {
                                if (!draft?.items) return;

                                // remove temp
                                draft.items = draft.items.filter(c => c.id !== tempId);

                                // add real
                                draft.items.push(newComment.data);
                            }
                        )
                    );
                } catch {
                    patchResult.undo();
                }
            },
        })

    }),


    overrideExisting: true, // allows us to redefine endpoints without TypeScript errors, which is useful during development when we might be iterating on the API design. In production, you might want to set this to false to catch accidental endpoint redefinitions.
});

export const {
    useUpdateTaskMutation,
    useGetTasksQuery,
    useCreateTaskMutation,
    useGetTaskByIdQuery,
    useGetTaskCommentsQuery,
    useAddCommentMutation,
} = tasksApi;