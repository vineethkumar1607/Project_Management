import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { projectSettingsSchema } from "../lib/projectSettings.schema"
import { useEffect } from "react"
import toast from "react-hot-toast";
import type { Project } from "~/types/workspace";
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, } from "~/components/ui/select";
import { Button } from "./ui/button"
import { Calendar } from "lucide-react"

import { useAppDispatch } from "~/store/hooks";
import { updateProject } from "~/store/projectThunk";

type ProjectSettingsFormValues = z.infer<typeof projectSettingsSchema>

/**
 * Zod schema for validation
 */

const getProgress = (start?: string, end?: string) => {
    if (!start || !end) return 0;

    const s = new Date(start).getTime();
    const e = new Date(end).getTime();

    if (e <= s) return 0;

    const now = Date.now();

    const total = e - s;
    const current = now - s;

    return Math.min(Math.max((current / total) * 100, 0), 100);
};

const statusColor = {
    PLANNING: "text-yellow-500",
    ACTIVE: "text-blue-500",
    ON_HOLD: "text-orange-500",
    COMPLETED: "text-green-500",
    CANCELLED: "text-red-500",
};
const priorityColor = {
    LOW: "text-green-500",
    MEDIUM: "text-yellow-500",
    HIGH: "text-red-500",
};

const ProjectDetailsForm = ({ project }: { project: Project }) => {

    const { register, handleSubmit, reset, watch, control, formState: { errors, isSubmitting, isDirty }, } = useForm<ProjectSettingsFormValues>({
        resolver: zodResolver(projectSettingsSchema),
        defaultValues: {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            status: "PLANNING",
            priority: "MEDIUM",
        },
    });

    const dispatch = useAppDispatch();

    const formatDate = (date?: string) => {
        if (!date) return "";

        const d = new Date(date);
        if (isNaN(d.getTime())) return "";

        return d.toISOString().split("T")[0];
    };
    /**
   * Prefill form when project loads
   */
    // watch("priority");
    register("priority");
    useEffect(() => {
        if (project) {
            reset({
                name: project.name || "",
                description: project.description || "",
                startDate: formatDate(project.start_date),
                endDate: formatDate(project.end_date),
                status: project?.status || "PLANNING",
                priority: project.priority || "MEDIUM",
            });
        }
    }, [project, reset]);

    const onSubmit = async (data: ProjectSettingsFormValues) => {
        try {
            const payload = {
                name: data.name,
                description: data.description,
                status: data.status,
                priority: data.priority,
                start_date: data.startDate,
                end_date: data.endDate,
                progress,
            };

            
            await dispatch(
                updateProject({
                    projectId: project.id,
                    payload,
                })
            ).unwrap();
            toast.success("Project updated successfully");
        } catch (error) {
            console.error("Update failed:", error)
            toast.error("Failed to update project");
        }
    }

    const startDate = watch("startDate");
    const endDate = watch("endDate");
    const progress = getProgress(startDate, endDate);

    {
        isDirty && (
            <p className="text-xs text-blue-500">
                You have unsaved changes
            </p>
        )
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
        >
            {/* -------- Project Name -------- */}
            <div className="space-y-3">
                <label htmlFor="name" className="font-medium flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                    Project Name
                </label>

                <Input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                />

                {errors.name && (
                    <p id="name-error" className="text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            {/* -------- Description -------- */}
            <div className="space-y-3">
                <label htmlFor="description" className="font-medium flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                    Description
                </label>

                <Textarea
                    id="description"
                    rows={4}
                    {...register("description")}
                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* -------- Dates -------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/30">
                <div className="space-y-3">
                    <label htmlFor="startDate" className="font-medium flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                        <Calendar size={14} />
                        Start Date
                    </label>

                    <Input
                        id="startDate"
                        type="date"
                        {...register("startDate")}
                        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="space-y-3">
                    <label htmlFor="endDate" className="text-sm font-medium flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
                        <Calendar size={14} />
                        End Date
                    </label>

                    <Input
                        id="endDate"
                        type="date"
                        {...register("endDate")}
                        className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-invalid={!!errors.endDate}
                        aria-describedby="endDate-error"
                    />

                    {errors.endDate && (
                        <p id="endDate-error" className="text-sm text-red-500">
                            {errors.endDate.message}
                        </p>
                    )}
                </div>
            </div>

            {/* -------- Status + Priority -------- */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/30">
                <div className="space-y-3 w-full">
                    <label className=" font-medium flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">

                        Status

                        <span
                            className={`ml-1 text-xs font-semibold ${statusColor[watch("status") || "PLANNING"]
                                }`}>
                            {watch("status")}
                        </span>
                    </label>

                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="PLANNING">Planning</SelectItem>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="ON_HOLD">On Hold</SelectItem>
                                    <SelectItem value="COMPLETED">Completed</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className="space-y-3 w-full">
                    <label className="font-medium flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Priority
                        <span
                            className={`ml-1 text-xs font-semibold ${priorityColor[watch("priority") || "MEDIUM"]
                                }`}
                        >
                            {watch("priority")}
                        </span>
                    </label>

                    <Controller
                        control={control}
                        name="priority"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select priority" />

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

            {/* -------- Progress Bar -------- */}
            <div className="space-y-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="font-medium flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">Project Progress</span>
                    <span>{Math.round(progress)}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500
        ${progress < 30 ? "bg-red-500" :
                                progress < 70 ? "bg-yellow-500" :
                                    "bg-green-500"}
      `}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* -------- Submit Button -------- */}
            <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                    Last updated just now
                </p>
                <Button
                    type="submit"
                    disabled={!isDirty || isSubmitting}
                    className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50"
                >
                    {isSubmitting ? "Saving..." : isDirty ? "Save Changes" : "Saved"}
                </Button>
            </div>
        </form>
    )
}

export default ProjectDetailsForm
