import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { dummyWorkspaces } from "../assets/data"

interface WorkspaceState {
    currentWorkspaceId: string
}

const initialState: WorkspaceState = {
    currentWorkspaceId: dummyWorkspaces[0].id,
}

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setCurrentWorkspace(
            state,
            action: PayloadAction<string>
        ) {
            state.currentWorkspaceId = action.payload
        },
    },
})

export const { setCurrentWorkspace } =
    workspaceSlice.actions

export default workspaceSlice.reducer