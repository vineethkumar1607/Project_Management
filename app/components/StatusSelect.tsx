import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "~/components/ui/select";
import ConfirmDialog from "./Common/ConfirmDailog";
import { useUpdateTaskMutation } from "~/store/api/tasksApi";


const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE"] as const;

type StatusType = (typeof STATUS_OPTIONS)[number];

interface Props {
    defaultValue: StatusType;
    taskId: string;
    disabled?: boolean;
}
const StatusSelect = ({ defaultValue, disabled, taskId }: Props) => {

    const [updateTask, { isLoading }] = useUpdateTaskMutation();

    const [pendingStatus, setPendingStatus] = useState<StatusType | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [status, setStatus] = useState<StatusType>(defaultValue);

    const getStatusColor = (value: StatusType) => {
        switch (value) {
            case "DONE":
                return "bg-green-100 text-green-700 border-green-200";
            case "IN_PROGRESS":
                return "bg-blue-100 text-blue-700 border-blue-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    // Handle the confirmation of status update with optimistic UI update. If the server call fails, it rolls back to the previous status.
    const handleConfirmUpdate = async () => {
        if (!pendingStatus) return;

        const previousStatus = status;

        setStatus(pendingStatus); //  optimistic

        try {
            await updateTask({
                taskId,
                body: { status: pendingStatus },
            }).unwrap();

            toast.success("Status updated");
        } catch {
            setStatus(previousStatus); // rollback on error 
            toast.error("Failed to update status");
        }
    };

    // Sync local state with prop changes (e.g., after an update from the server)
    useEffect(() => {
        setStatus(defaultValue);
    }, [defaultValue]);



    return (
        <>
            <Select
                disabled={disabled || isLoading}
                value={status}
                onValueChange={(value: StatusType) => {
                    if (value === status) return; // No change
                    setPendingStatus(value);
                    setIsDialogOpen(true);
                }}
            >
                <SelectTrigger
                    className={`w-[140px] h-8 text-xs font-medium rounded-md border px-2 flex items-center justify-center ${getStatusColor(status)}`}
                >
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option.replace("_", " ")}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <ConfirmDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title="Update Task Status"
                description={`Are you sure you want to change status to ${pendingStatus?.replace("_", " ")}?`}
                confirmText="Update"
                onConfirm={handleConfirmUpdate}
                loading={isLoading}
            />
        </>
    )
}

export default StatusSelect
