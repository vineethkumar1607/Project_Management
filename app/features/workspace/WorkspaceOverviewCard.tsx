import { Pencil } from "lucide-react";
import PrimaryButton from "~/components/common/PrimaryButton";
import DangerZoneSection from "~/components/common/DangerZoneSection";
import ConfirmDialog from "~/components/common/ConfirmDialog";
import { useWorkspaceOverview } from "./hooks/useWorkspaceOverview";


export default function WorkspaceOverviewCard() {

  const workspaceOverview = useWorkspaceOverview();

  const { workspace, permissions, edit, deleteDialog, } = workspaceOverview;

  const { currentWorkspace, organization, workspaceName, memberCount, projectCount, } = workspace;

  const { canEditWorkspace, canDeleteWorkspace, } = permissions;

  const { isEditing, isSaving, hasChanges, setWorkspaceName, handleSaveWorkspace, handleCancelEdit, handleToggleEdit, } = edit;

  const { isDeleting, showDeleteDialog, deleteConfirmation, isDeleteConfirmed, setDeleteConfirmation, handleDeleteWorkspace, handleDeleteDialogChange, setShowDeleteDialog, } = deleteDialog;

  if (!currentWorkspace) return null;


  return (
    <div className="space-y-8">
      {/* Workspace Overview */}
      <section className="rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">
              Workspace Overview
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage workspace information and
              configuration settings.
            </p>
          </div>
          {canEditWorkspace && (
            <button

              type="button"
              onClick={handleToggleEdit}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <Pencil size={14} />

              {isEditing ? "Cancel" : "Edit"}
            </button>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {/* Workspace Name */}
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Workspace Name
            </p>

            {isEditing ? (
              <input
                value={workspaceName}
                onChange={(e) =>
                  setWorkspaceName(
                    e.target.value
                  )
                }
                maxLength={50}
                placeholder="Enter workspace name"
                className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary"
              />
            ) : (
              <p className="mt-1 font-medium">
                {organization?.name || currentWorkspace.name}
              </p>
            )}
          </div>

          {/* Workspace Slug */}
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Workspace Slug
            </p>

            <p className="mt-1 font-medium">
              {organization?.slug || "No slug"}
            </p>
          </div>

          {/* Members */}
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Members
            </p>

            <p className="mt-1 font-medium">
              {memberCount} Members
            </p>
          </div>

          {/* Projects */}
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Projects
            </p>

            <p className="mt-1 font-medium">
              {projectCount} Projects
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex items-center gap-3">
            <PrimaryButton
              onClick={handleSaveWorkspace}
              disabled={
                isSaving || !hasChanges
              }
            >
              {isSaving
                ? "Saving..."
                : "Save Changes"}
            </PrimaryButton>

            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={isSaving}
              className="rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </section>

      {/* Delete Workspace */}

      {canDeleteWorkspace && (
        <DangerZoneSection
          title="Delete Workspace"
          description="Permanently delete this workspace and all associated projects, tasks, and members. This action cannot be undone."
        >
          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Delete Workspace
          </button>
        </DangerZoneSection>
      )}

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={handleDeleteDialogChange}
        title="Delete Workspace"
        description="This action permanently deletes the workspace and all associated data."
        confirmText="Delete Workspace"
        loading={isDeleting}
        onConfirm={handleDeleteWorkspace}
        confirmDisabled={!isDeleteConfirmed}
      >
        <div className="space-y-4">
          {/* Warning Box */}
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20" >
            <p className="text-sm text-red-700 dark:text-red-300">
              This action cannot be undone.All projects, tasks, members,and workspace data will be permanently removed.
            </p>
          </div>

          {/* Confirmation Text */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Please type{" "}
              <span className="font-semibold text-foreground">
                {currentWorkspace.name}
              </span>{" "}
              to confirm.
            </p>

            <div className="space-y-1">
              <input type="text" value={deleteConfirmation} onChange={(e) =>
                setDeleteConfirmation(e.target.value)
              }
                placeholder="Enter workspace name"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-red-500"
              />

              {/* Stable Validation Area */}
              <div className="min-h-5">
                {deleteConfirmation ? (
                  isDeleteConfirmed ? (
                    <p className="text-xs text-green-600">
                      Workspace name matched.
                    </p>
                  ) : (
                    <p className="text-xs text-red-500">
                      Workspace name does not match.
                    </p>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </ConfirmDialog>
    </div>
  );
}