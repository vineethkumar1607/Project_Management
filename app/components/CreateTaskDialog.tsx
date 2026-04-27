import { memo, type FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "~/components/ui/select";

import { useForm, Controller } from "react-hook-form";
import { useCreateTaskMutation } from "~/store/api/tasksApi";
import { useParams } from "react-router";
import type { RootState } from "~/store/store";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";



interface Props {
    setIsDialogOpen: (open: boolean) => void;
}

type TaskFormData = {
    title: string;
    description?: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    type: "TASK" | "BUG" | "FEATURE" | "IMPROVEMENT" | "OTHER";
    assigneeId: string;
    due_date: string;
};

type Member = {
    id: string;
    email: string;
    name?: string;
    role: string;
};
const CreateTaskDialog: FC<Props> = ({ setIsDialogOpen }) => {
    const { projectId } = useParams();
    const [createTask, { isLoading }] = useCreateTaskMutation();

    // Fetch members list for the workspace
    const membersList = useSelector((state: RootState) => {
        const workspaceId = state.workspace.currentWorkspaceId;

        if (!workspaceId) return [];

        return state.workspace.membersByWorkspace[workspaceId]?.data ?? [];
    });

    // Initialize form with react-hook-form
    const { register, handleSubmit, watch, control, formState: { errors, isSubmitting }, reset,
    } = useForm<TaskFormData>({
        defaultValues: {
            status: "TODO", priority: "MEDIUM", type: "TASK", assigneeId: "", due_date: "",
        },
    });

    // Handle form submission for creating a new task
    const onSubmit = async (data: TaskFormData) => {
        if (!projectId) return;

        const toastId = toast.loading("Creating task...");

        try {
            console.log("CREATE TASK PAYLOAD:", {
                projectId,
                ...data,
            });
            // 
            await createTask({
                projectId,
                ...data,
            }).unwrap(); // unwrap to handle errors properly

            toast.success("Task created", { id: toastId });

            reset();
            setIsDialogOpen(false);
        } catch (err: any) {
            console.error("CREATE TASK ERROR:", err);

            const message =
                err?.data?.message ||   // backend message
                err?.data?.error ||
                err?.error || "Something went wrong"; //fallback message

            toast.error(message, { id: toastId });
        }
    };

    console.log("Members List:", membersList);

    return (
        <Dialog open onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input {...register("title", { required: "Title is required" })} />
                        {errors.title && (
                            <p className="text-red-500 text-xs">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea {...register("description")} />
                    </div>

                    {/* Status + Priority */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value || ""}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="TODO">To Do</SelectItem>
                                            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                            <SelectItem value="DONE">Done</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Priority</label>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="LOW">Low</SelectItem>
                                            <SelectItem value="MEDIUM">Medium</SelectItem>
                                            <SelectItem value="HIGH">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                    </div>

                    {/* Type + Due Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Type</label>
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="TASK">Task</SelectItem>
                                            <SelectItem value="BUG">Bug</SelectItem>
                                            <SelectItem value="FEATURE">Feature</SelectItem>
                                            <SelectItem value="IMPROVEMENT">Improvement</SelectItem>
                                            <SelectItem value="OTHER">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Due Date</label>
                            <Input type="date" {...register("due_date")} />
                        </div>

                    </div>

                    {/* Assignee */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Assignee</label>
                        <Controller
                            name="assigneeId"
                            control={control}
                            rules={{ required: "Assignee required" }}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {membersList.length === 0 ? (
                                            <div className="p-2 text-sm text-muted-foreground">
                                                No members found
                                            </div>
                                        ) : (
                                            membersList.map((m: Member) => (
                                                <SelectItem key={m.id} value={m.id}>
                                                    {m.name || m.email}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* Footer */}
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            disabled={!watch("assigneeId")}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isSubmitting} variant="gradient">
                            {isSubmitting ? "Creating..." : "Create Task"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
};

export default memo(CreateTaskDialog);