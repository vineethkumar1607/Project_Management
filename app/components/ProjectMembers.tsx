import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "~/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "~/components/ui/select";
import { useAppDispatch } from "~/store/hooks";
import { addProjectMember, removeProjectMember } from "~/store/projectThunk";
import ConfirmDialog from "./ConfirmDailog";
import type { Project, WorkspaceMember } from "~/types/workspace";

type Props = {
  project: Project;
  workspaceMembers: WorkspaceMember[];
};

const ProjectMembers = ({ project, workspaceMembers }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  /**
   * DERIVED STATE (memoized)
   * This is computed data, not stored state
   * Prevents unnecessary recalculations
   */
  const projectMemberIds = useMemo(() => {
    return project?.members?.filter(m => m?.user)?.map((member) => member.user.id) || [];
  }, [project]);

  /**
   * AVAILABLE MEMBERS (FILTER)
   * Remove already added users
   */
  const availableMembers = useMemo(() => {
    return workspaceMembers.filter((wm) => {
      return !projectMemberIds.includes(wm.id);
    });
  }, [workspaceMembers, projectMemberIds]);

  /**
   * HANDLER
   * Later → dispatch API
   */
  const handleAddMember = async () => {
    if (!selectedMember) return;
    // PREVENT DUPLICATE (IMPORTANT)
    if (projectMemberIds.includes(selectedMember)) {
      toast.error("User already in project");
      return;
    }

    const member = workspaceMembers.find(
      (m) => m.id === selectedMember
    );

    if (!member) return;

    try {
      setIsAdding(true);
      await dispatch(
        addProjectMember({
          projectId: project.id,
          email: member.email
        })
      ).unwrap();

      toast.success("Member added successfully");

      setSelectedMember("");
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error || "Failed to add member");
    }
    finally {
      setIsAdding(false);
    }
  };


  const handleConfirmRemove = async () => {
    if (!selectedMemberId) return;

    try {
      setRemovingId(selectedMemberId);

      await dispatch(
        removeProjectMember({
          projectId: project.id,
          memberId: selectedMemberId,
        })
      ).unwrap();

      toast.success("Member removed successfully");
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove member");
      throw err; // IMPORTANT → keeps dialog open
    } finally {
      setRemovingId(null);
    }
  };

  console.log("workspaceMembers:", workspaceMembers);
  console.log("projectMembers:", project?.members);

  return (
    <section className="space-y-6">

      {/* -------- Header -------- */}
      <header className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Project Members</h2>

        <Button onClick={() => setIsOpen(true)}>
          Add Member
        </Button>
      </header>

      {/* -------- Dialog -------- */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">

          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription>
              Select a workspace member to add to this project
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">

            {availableMembers.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                All workspace members already added
              </p>
            ) : (
              <Select
                value={selectedMember}
                onValueChange={setSelectedMember}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>

                <SelectContent>
                  {availableMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name || "Unknown"} ({member.email || "No email"})
                      
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button
              onClick={handleAddMember}
              disabled={
                !selectedMember ||
                availableMembers.length === 0 ||
                isAdding
              }
            >
              {isAdding ? "Adding..." : "Add Member"}
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>

      {/* -------- Project Members List -------- */}
      <ul className="space-y-4">
        {!project?.members?.length && (
          <p className="text-sm text-muted-foreground">
            No members added yet
          </p>
        )}
        {project?.members?.map((member) => (
          <li
            key={member.id}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-start">

              <div>
                <p className="font-medium">
                  {member.user?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {member.user?.email}
                </p>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setSelectedMemberId(member.user?.id);
                  setConfirmOpen(true);
                }}
                disabled={
                  member.user?.id === project.team_lead ||
                  removingId === member.user?.id
                }
              >
                Remove
              </Button>

            </div>
          </li>
        ))}
      </ul>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Remove Member"
        description="Are you sure you want to remove this member from the project? This action cannot be undone."
        confirmText="Remove"
        cancelText="Cancel"
        onConfirm={handleConfirmRemove}
        loading={!!removingId}
      />
    </section>
  );
};

export default ProjectMembers;