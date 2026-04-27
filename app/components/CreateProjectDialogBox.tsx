import { memo, useEffect, type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import { createProject } from "~/store/projectThunk";
import type { AppDispatch, RootState } from "~/store/store";
import { fetchWorkspaceMembers } from "~/store/workspaceThunk";

import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

/* ======================= */

interface CreateProjectDialogProps {
  setIsDialogOpen: (open: boolean) => void;
}

/* ======================= */

type FormData = {
  name: string;
  description?: string;
  status: string;
  priority: string;
  startDate?: string;
  endDate?: string;
  lead?: string;
  members: string[];
};

type Member = {
  email: string;
};

/* ======================= */

const CreateProjectDialog: FC<CreateProjectDialogProps> = ({
  setIsDialogOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const workspaceId = useSelector(
    (state: RootState) => state.workspace.currentWorkspaceId
  );

  const membersList = useSelector((state: RootState) => {
    const id = state.workspace.currentWorkspaceId;

    if (!id) return [];

    return state.workspace.membersByWorkspace[id]?.data ?? [];
  });


  console.log("membersList", membersList)
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
      status: "PLANNING",
      priority: "MEDIUM",
      startDate: "",
      endDate: "",
      lead: "",
      members: [],
    },
  });

 const members = watch("members") || [];


  /* ======================= */

  const handleMemberToggle = (email: string) => {
    const updated = members.includes(email)
      ? members.filter((m) => m !== email)
      : [...members, email];

    setValue("members", updated);
  };

  /* ======================= */

  const onSubmit = async (data: FormData) => {
    if (!workspaceId) return;

    const toastId = toast.loading("Creating project...");

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

    console.log("FINAL PAYLOAD:", transformedPayload);

    try {
      await dispatch(
        createProject({
          workspaceId,
          payload: transformedPayload,
        })
      ).unwrap();
      console.log("CREATED PROJECT:", data);

      toast.success("Project created", { id: toastId });

      setIsDialogOpen(false);
    } catch (err: any) {
      toast.error(err || "Failed", { id: toastId });
    }
  };

  /* ======================= */
  useEffect(() => {
    if (workspaceId) {
      dispatch(fetchWorkspaceMembers(workspaceId));
    }
  }, [workspaceId]);
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
                    {membersList.map((m: Member) => (
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
                {membersList.map((m: Member) => (
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