import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "~/components/ui/dialog";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "~/components/ui/select";
import { useAppDispatch } from "~/store/hooks";
import { addProjectMember } from "~/store/projectThunk";

type Props = {
  project: any;
  workspaceMembers: any[];
};

const ProjectMembers = ({ project, workspaceMembers }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");

  const dispatch = useAppDispatch();

  /**
   * DERIVED STATE (memoized)
   * This is computed data, not stored state
   * Prevents unnecessary recalculations
   */
  const projectMemberIds = useMemo(() => {
    return project?.members?.map((m: any) => m.user?.id) || [];
  }, [project]);

  /**
   * AVAILABLE MEMBERS (FILTER)
   * Remove already added users
   */
  const availableMembers = useMemo(() => {
    return workspaceMembers.filter(
      (wm) => !projectMemberIds.includes(wm.id)
    );
  }, [workspaceMembers, projectMemberIds]);

  /**
   * HANDLER
   * Later → dispatch API
   */
  const handleAddMember = async () => {
  if (!selectedMember) return;

  const member = workspaceMembers.find(
    (m) => m.id === selectedMember
  );

  if (!member) return;

  try {
    await dispatch(
      addProjectMember({
        projectId: project.id,
        email: member.email,
      })
    ).unwrap();

    toast.success("Member added successfully 🔥");

    setSelectedMember("");
    setIsOpen(false);
  } catch (error: any) {
    toast.error(error || "Failed to add member");
  }
};

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
                      {member.name} ({member.email})
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
              disabled={!selectedMember || availableMembers.length === 0}
            >
              Add Member
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>

      {/* -------- Project Members List -------- */}
      <ul className="space-y-4">
        {project?.members?.map((member: any) => (
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

              <Button variant="destructive" size="sm">
                Remove
              </Button>

            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectMembers;