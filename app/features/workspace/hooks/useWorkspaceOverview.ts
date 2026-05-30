import { useDebounce } from "~/hooks/useDebounce";
import { useProjectsData } from "~/features/projects/hooks/useProjectsData";
import { useWorkspaceMembers } from "./useWorkspaceMembers";
import { useWorkspacePermissions } from "~/hooks/useWorkspacePermissions";
import { useActiveWorkspace } from "./useActiveWorkspace";
import { useOrganization } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const useWorkspaceOverview = () => {

    const { currentWorkspace } = useActiveWorkspace();
    const { members } = useWorkspaceMembers();
    const { projects } = useProjectsData();
    const { organization } = useOrganization();
    const { canEditWorkspace, canDeleteWorkspace, } = useWorkspacePermissions();

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [workspaceName, setWorkspaceName] = useState(currentWorkspace?.name || "");
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);


    const memberCount = useMemo(() => members.length, [members]);
    const projectCount = useMemo(() => projects.length, [projects]);

    const hasChanges = workspaceName.trim() !== (organization?.name || currentWorkspace?.name || "").trim();

    const debouncedDeleteConfirmation = useDebounce(deleteConfirmation, 300);
    const isDeleteConfirmed = debouncedDeleteConfirmation.trim() === currentWorkspace?.name?.trim();


    useEffect(() => {
        setWorkspaceName(organization?.name || currentWorkspace?.name || "");
    }, [organization?.name, currentWorkspace?.name,]);


    const handleSaveWorkspace = async () => {
        if (!organization) {
            toast.error("Organization not found");

            return;
        }

        const trimmedName = workspaceName.trim();

        if (!trimmedName) {
            toast.error("Workspace name is required");

            return;
        }

        if (!hasChanges) return;


        try {
            setIsSaving(true);

            await organization.update({ name: trimmedName, });

            toast.success("Workspace updated successfully");

            setIsEditing(false);
        } catch (error) {
            console.error(error);

            toast.error("Failed to update workspace");
        } finally {
            setIsSaving(false);
        }
    };


    const handleCancelEdit = () => {
        setWorkspaceName(organization?.name || currentWorkspace?.name || "");

        setIsEditing(false);
    };

    const handleToggleEdit = () => {
        if (isEditing) {
            handleCancelEdit();
            return;
        }

        setIsEditing(true);
    };



    const handleDeleteDialogChange = (open) => {
        setShowDeleteDialog(open);

        if (!open) {
            setDeleteConfirmation("");
        }
    };


    const handleDeleteWorkspace = async () => {
        try {
            setIsDeleting(true);

            if (!organization) {
                toast.error("Organization not found");

                return;
            }


            setShowDeleteDialog(false);
            setDeleteConfirmation("");

            await organization.destroy();

            toast.success(`"${currentWorkspace?.name}" deleted successfully`);
        } catch (error) {

            toast.error("Failed to delete workspace");

            throw error;

        } finally {
            setIsDeleting(false);
        }
    };

    return {
        workspace: {
            currentWorkspace,
            organization,
            workspaceName,
            memberCount,
            projectCount,
        },

        permissions: {
            canEditWorkspace,
            canDeleteWorkspace,
        },

        edit: {
            isEditing,
            isSaving,
            hasChanges,
            setWorkspaceName,
            handleSaveWorkspace,
            handleCancelEdit,
            handleToggleEdit,
        },

        deleteDialog: {
            showDeleteDialog,
            deleteConfirmation,
            isDeleteConfirmed,
            isDeleting,
            handleDeleteWorkspace,
            setDeleteConfirmation,
            handleDeleteDialogChange,
            setShowDeleteDialog,
        },
    };
}