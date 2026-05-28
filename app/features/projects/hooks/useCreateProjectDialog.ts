import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAppDispatch } from "~/store/hooks";
import { createProject } from "~/store/thunks/projectThunk";

import { useWorkspaceMembers } from "~/features/workspace/hooks/useWorkspaceMembers";
import type { Project } from "~/types/workspace";
import { useActiveWorkspace } from "~/features/workspace/hooks/useActiveWorkspace";

type FormData = {
    name: string;
    description?: string;
    status: Project["status"];
    priority: Project["priority"];
    startDate?: string;
    endDate?: string;
    lead?: string;
    members: string[];
};

type Props = {
    onSuccess: () => void;
};

export const useCreateProjectDialog = ({
    onSuccess }: Props) => {
    const dispatch = useAppDispatch();

    const { currentWorkspaceId: workspaceId } =useActiveWorkspace();
    const { members: membersList, } = useWorkspaceMembers();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            description: "",
            status: "PLANNING",
            priority: "MEDIUM",
            startDate: "",
            endDate: "",
            lead: "",
            members: [],
        },
    });

    const members = watch("members") || [];

    const handleMemberToggle = (email: string) => {
        const updated = members.includes(email)
            ? members.filter((m) => m !== email)
            : [...members, email];

        setValue("members", updated);
    };

    const onSubmit = async (data: FormData) => {
        if (!workspaceId) return;

        const toastId = toast.loading(
            "Creating project..."
        );

        const transformedPayload = {
            workspaceId,
            name: data.name,
            description: data.description || "",
            status: data.status,
            priority: data.priority,
            progress: 0,

            start_date: data.startDate,
            end_date: data.endDate,

            team_lead: data.lead,
            team_members: data.members,
        };

        try {
            await dispatch(
                createProject({
                    workspaceId,
                    payload: transformedPayload,
                })
            ).unwrap();

            toast.success("Project created", {
                id: toastId,
            });

            onSuccess();
        } catch (err: any) {
            toast.error(
                err || "Failed to create project",
                {
                    id: toastId,
                }
            );
        }
    };

    return {
        register,
        handleSubmit,
        control,
        errors,
        isSubmitting,
        members,
        membersList,
        handleMemberToggle,
        onSubmit,
    };
};