import { useEffect, useMemo, useState } from "react";

import { useOrganization } from "@clerk/clerk-react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";

import PrimaryButton from "~/components/common/PrimaryButton";

import { useProjectsData } from "~/features/projects/hooks/useProjectsData";
import { useCurrentWorkspace } from "~/features/workspace/hooks/useCurrentWorkspace";
import { useWorkspaceMembers } from "~/features/workspace/hooks/useWorkspaceMembers";

export default function WorkspaceOverviewCard() {
  const { currentWorkspace } = useCurrentWorkspace();

  const { members } = useWorkspaceMembers();

  const { projects } = useProjectsData();

  const { organization } = useOrganization();

  const [isEditing, setIsEditing] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [workspaceName, setWorkspaceName] = useState(
    currentWorkspace?.name || ""
  );
  useEffect(() => {
    setWorkspaceName(
      organization?.name ||
      currentWorkspace?.name ||
      ""
    );
  }, [
    organization?.name,
    currentWorkspace?.name,
  ]);

  const memberCount = useMemo(
    () => members.length,
    [members]
  );

  const projectCount = useMemo(
    () => projects.length,
    [projects]
  );

  const hasChanges = workspaceName.trim() !== (organization?.name || currentWorkspace?.name || "").trim();

  if (!currentWorkspace) {
    return null;
  }

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

    if (!hasChanges) {
      return;
    }

    try {
      setIsSaving(true);

      await organization.update({
        name: trimmedName,
      });

      toast.success(
        "Workspace updated successfully"
      );

      setIsEditing(false);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update workspace"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setWorkspaceName(currentWorkspace.name);

    setIsEditing(false);
  };

  console.log(organization?.name);

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

          <button
            type="button"
            onClick={() =>
              setIsEditing((prev) => !prev)
            }
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            <Pencil size={14} />

            {isEditing ? "Cancel" : "Edit"}
          </button>
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
      <section className="rounded-xl border border-red-200 bg-red-50/50 p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-red-600">
            Delete Workspace
          </h2>

          <p className="text-sm text-muted-foreground">
            Permanently delete this workspace and
            all associated projects, tasks, and
            members. This action cannot be undone.
          </p>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            Delete Workspace
          </button>
        </div>
      </section>
    </div>
  );
}