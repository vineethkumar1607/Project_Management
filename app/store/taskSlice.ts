import { createSlice,type  PayloadAction } from "@reduxjs/toolkit";

interface Task {
    id: string;
    title: string;
    projectId: string;
    status: string;
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
}

const initialState: TaskState = {
    tasks: [],
    loading: false,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        // set all tasks (API fetch)
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks = action.payload;
        },

        // add task
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },

        // update task
        updateTask(state, action: PayloadAction<Task>) {
            state.tasks = state.tasks.map(t =>
                t.id === action.payload.id ? action.payload : t
            );
        },

        // delete task
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter(
                t => t.id !== action.payload
            );
        },
    },
});

export const {
    setTasks,
    addTask,
    updateTask,
    deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;