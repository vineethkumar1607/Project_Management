import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

import DangerZoneSection from "~/components/common/DangerZoneSection";
import ConfirmDialog from "~/components/common/ConfirmDialog";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import type { Project } from "~/types/workspace";

import { useAppDispatch, } from "~/store/hooks";
import { deleteProject } from "~/store/thunks/projectThunk";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { workspaceRoutes } from "~/lib/routesHelper";
import { useProjectPermissions } from "~/hooks/useProjectPermissions";
import { useActiveWorkspace } from "~/features/workspace/hooks/useActiveWorkspace";


type DeleteProjectSectionProps = {
    project: Project;
};

const DeleteProjectSection = ({ project, }: DeleteProjectSectionProps) => {
    const [open, setOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { currentWorkspaceId: workspaceId } = useActiveWorkspace();

    const { canDeleteProject } =
        useProjectPermissions(project);

    if (!canDeleteProject) return null;

    const isMatch = useMemo(() => {
        return confirmText.trim() === project.name;
    }, [confirmText, project.name]);

    const handleDelete = async () => {
        if (!workspaceId) return;

        try {
            setIsDeleting(true);

            await dispatch(
                deleteProject({
                    workspaceId,
                    projectId: project.id,
                })
            ).unwrap();

            toast.success("Project deleted successfully");

            setConfirmText("");

            navigate(
                workspaceRoutes.projects(workspaceId)
            );

        } catch (error: any) {

            toast.error(
                error || "Failed to delete project"
            );

        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <DangerZoneSection
                title="Delete Project"
                description="Once you delete a project, there is no going back. Please be certain."
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">
                            Permanently delete this project
                        </p>

                        <p className="text-sm text-muted-foreground">
                            All tasks, members, and project data will be permanently removed.
                        </p>
                    </div>

                    <Button
                        variant="destructive"
                        onClick={() => setOpen(true)}
                    >
                        <Trash2 className="size-4 mr-2" />
                        Delete Project
                    </Button>
                </div>
            </DangerZoneSection>

            <ConfirmDialog
                open={open}
                onOpenChange={setOpen}
                title="Delete Project"
                description={`Type "${project.name}" to confirm project deletion.`}
                confirmText="Delete Project"
                loading={isDeleting}
                confirmDisabled={!isMatch}
                onConfirm={handleDelete}
            >
                <div className="space-y-3 py-2">
                    <Input
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder={`Type "${project.name}"`}
                    />

                    {!isMatch && confirmText.length > 0 && (
                        <p className="text-sm text-red-500">
                            Project name does not match.
                        </p>
                    )}
                </div>
            </ConfirmDialog>
        </>
    );
};

export default DeleteProjectSection;