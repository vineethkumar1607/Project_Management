import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "~/components/ui/select";


const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "DONE"] as const;

type StatusType = (typeof STATUS_OPTIONS)[number];

interface Props {
    defaultValue: StatusType;
    taskId: string;
    disabled?: boolean;
}
const StatusSelect = ({ defaultValue, disabled, taskId }: Props) => {
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

    // Sync local state with prop changes (e.g., after an update from the server)
    useEffect(() => {
        setStatus(defaultValue);
    }, [defaultValue]);


    return (
        <Select disabled={disabled} value={status} onValueChange={(value: StatusType) => setStatus(value)}>
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
    )
}

export default StatusSelect
