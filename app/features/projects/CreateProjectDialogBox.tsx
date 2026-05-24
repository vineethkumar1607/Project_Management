import { memo, type FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "~/components/ui/select";
import { useCreateProjectDialog } from "~/features/projects/hooks/useCreateProjectDialog";
import type { WorkspaceMember } from "~/types/workspace";
import { Controller } from "react-hook-form";


interface CreateProjectDialogProps {
  setIsDialogOpen: (open: boolean) => void;
}

const CreateProjectDialog: FC<CreateProjectDialogProps> = ({ setIsDialogOpen, }) => {

  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    members,
    membersList,
    handleMemberToggle, onSubmit, } = useCreateProjectDialog({ onSuccess: () => setIsDialogOpen(false), });

  return (
    <Dialog open onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            In workspace:{" "}
            <span className="font-medium">Design Team</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Project Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Name</label>
            <Input
              {...register("name", { required: "Project name is required" })}
              placeholder="Enter project name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea {...register("description")} placeholder="Project description" />
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
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
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

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>

              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
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

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input type="date" {...register("startDate")} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input type="date" {...register("endDate")} />
            </div>

          </div>

          {/* Lead */}
          <div className="space-y-2 w-full">
            <label className="text-sm font-medium">Project Lead</label>

            <Controller
              name="lead"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select lead" />
                  </SelectTrigger>
                  <SelectContent>
                    {membersList.map((m: WorkspaceMember) => (
                      <SelectItem key={m.email} value={m.email}>
                        {m.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Members */}
          <div className="space-y-2 w-full">
            <label className="text-sm font-medium">Team Members</label>

            <Select onValueChange={(value) => handleMemberToggle(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add team members" />
              </SelectTrigger>
              <SelectContent>
                {membersList.map((m: WorkspaceMember) => (
                  <SelectItem key={m.email} value={m.email}>
                    {members.includes(m.email) ? `✓ ${m.email}` : m.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting} variant="gradient">
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateProjectDialog);