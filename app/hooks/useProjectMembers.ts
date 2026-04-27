import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store/hooks";
import { fetchProjectMembers } from "~/store/projectThunk";
import type { AppDispatch } from "~/store/store";

export const useProjectMembers = (projectId?: string) => {
    const dispatch = useDispatch<AppDispatch>();

    const members = useAppSelector(state =>
        projectId
            ? state.project.projectMembersByProject[projectId]?.data ?? []
            : []
    );

    const status = useAppSelector(state =>
        projectId
            ? state.project.projectMembersByProject[projectId]?.status ?? "idle"
            : "idle"
    );

    useEffect(() => {
        if (projectId && status === "idle") {
            dispatch(fetchProjectMembers(projectId));
        }
    }, [projectId, status, dispatch]);

    return {
        members,
        isLoading: status === "loading",
    };
};