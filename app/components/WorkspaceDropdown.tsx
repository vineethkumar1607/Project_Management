"use client";

import { memo } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useClerk } from "@clerk/clerk-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";

import { Button } from "~/components/ui/button";
import { useCurrentWorkspace } from "~/hooks/useCurrentWorkspace";

export const WorkspaceDropdown = memo(function WorkspaceDropdown() {
  const navigate = useNavigate();

  // Clerk organization management
  const {
    openCreateOrganization,
    setActive,
  } = useClerk();

  // Current workspace state
  const {
    workspaces,
    currentWorkspaceId,
    currentWorkspace,
  } = useCurrentWorkspace();

  // Switch active workspace
  const handleWorkspaceSelect = async (
    workspaceId: string
  ) => {
    await setActive({
      organization: workspaceId,
    });

    navigate(`/workspace/${workspaceId}`);
  };

  return (
    <div className="px-3 py-3 border-b">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between px-3 py-2 h-auto"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={
                  currentWorkspace?.image_url ||
                  "/default-avatar.png"
                }
                alt={currentWorkspace?.name}
                className="w-8 h-8 rounded-md object-cover"
              />

              <div className="text-left min-w-0">
                <p className="text-sm font-semibold truncate">
                  {currentWorkspace?.name ??
                    "Select Workspace"}
                </p>

                <p className="text-xs text-muted-foreground">
                  {workspaces.length} workspaces
                </p>
              </div>
            </div>

            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-64"
        >
          <DropdownMenuLabel>
            Workspaces
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {workspaces.map((workspace) => {
            const isActive =
              workspace.id === currentWorkspaceId;

            return (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() =>
                  handleWorkspaceSelect(
                    workspace.id
                  )
                }
                className="flex items-center gap-3"
              >
                <img
                  src={
                    workspace.image_url ||
                    "/default-avatar.png"
                  }
                  alt={workspace.name}
                  className="w-6 h-6 rounded-md"
                />

                <span className="flex-1 truncate">
                  {workspace.name}
                </span>

                {isActive && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-blue-600"
            onClick={() =>
              openCreateOrganization()
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
