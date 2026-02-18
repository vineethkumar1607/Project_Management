import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { projectSettingsSchema } from "../lib/projectSettings.schema"

import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "~/components/ui/select"

type ProjectSettingsFormValues = z.infer<typeof projectSettingsSchema>

function ProjectDetailsForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ProjectSettingsFormValues>({
        resolver: zodResolver(projectSettingsSchema),
        defaultValues: {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            status: "PLANNING",
            priority: "MEDIUM",
        },
        mode: "onChange",
    })

    const onSubmit = async (data: ProjectSettingsFormValues) => {
        try {
            console.log("Submitting:", data)

            // TODO: dispatch(updateProject(data))
            // await dispatch(updateProject(data)).unwrap()

        } catch (error) {
            console.error("Update failed:", error)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
            aria-label="Project General Settings Form"
        >
            {/* Project Name */}
            <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium">
                    Project Name
                </label>
                <Input
                    id="name"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>

            {/* Description */}
            <div className="space-y-1">
                <label htmlFor="description" className="text-sm font-medium">
                    Description
                </label>
                <Textarea
                    id="description"
                    rows={4}
                    {...register("description")}
                />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="startDate" className="text-sm font-medium">
                        Start Date
                    </label>
                    <Input
                        id="startDate"
                        type="date"
                        {...register("startDate")}
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="endDate" className="text-sm font-medium">
                        End Date
                    </label>
                    <Input
                        id="endDate"
                        type="date"
                        {...register("endDate")}
                    />
                </div>
            </div>

            {/* Status & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Status */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger aria-label="Project Status">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PLANNING">Planning</SelectItem>
                                    <SelectItem value="IN_PROGRESS">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="COMPLETED">
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.status && (
                        <p className="text-sm text-red-500">
                            {errors.status.message}
                        </p>
                    )}
                </div>

                {/* Priority */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Priority</label>
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger aria-label="Project Priority">
                                    <SelectValue placeholder="Select Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.priority && (
                        <p className="text-sm text-red-500">
                            {errors.priority.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    )
}

export default ProjectDetailsForm
