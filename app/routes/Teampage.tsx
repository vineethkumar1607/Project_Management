import { useState, useMemo, useEffect, } from "react";
import { Users, UserPlus } from "lucide-react";

import TeamTable from "~/components/TeamTable";
import InviteMemberDialog from "../components/InviteMemberDialog";
import { Button } from "~/components/ui/button";
import { useOrganization } from "@clerk/clerk-react";
import type { Role } from "~/types/workspace";
import PrimaryButton from "~/components/Common/PrimaryButton";
import { useDebounce } from "~/hooks/useDebounce";
import FiltersBar from "~/components/Common/FiltersBar";
import { motion } from "framer-motion";
import { useWorkspaceMembers } from "~/hooks/useWorkspaceMembers";
import EmptyState from "~/components/Common/EmptyState";
import MetricCard from "~/components/MetricCard";
import toast from "react-hot-toast";

// This component represents the team management page, allowing users to view and manage workspace members. It includes features such as searching, filtering by role, and inviting new members. The component utilizes the `useWorkspaceMembers` hook to fetch and manage the members data, ensuring that the UI is responsive to loading states and errors while providing a seamless user experience for team management tasks.
export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "ALL">("ALL");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const { organization, } = useOrganization();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  // Get workspace members and related loading states using the custom hook. This hook abstracts away the logic for fetching members, handling loading states, and managing errors, providing a clean interface for the component to consume.
  const { members, isInitialLoading, isBackgroundLoading, } = useWorkspaceMembers();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery]);

  const normalizedMembers = useMemo(() => {
    return members.map((m: any) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      role: m.role,
    }));
  }, [members]);

  // Memoized role summary
  const roleSummary = useMemo(() => {
    const admins = normalizedMembers.filter(
      (m) => m.role === "ADMIN"
    ).length;

    const teamMembers = normalizedMembers.filter(
      (m) => m.role === "MEMBER"
    ).length;

    return {
      admins,
      teamMembers,
      total: normalizedMembers.length,
    };
  }, [normalizedMembers]);

  // Combined filtering
  const filteredMembers = useMemo(() => {
    return normalizedMembers.filter((member) => {
      const matchesSearch = member.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === "ALL" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [normalizedMembers, searchQuery, roleFilter]);

  const stats = useMemo(() => [
    {
      title: "Total Members",
      value: roleSummary.total,
      description: "members in workspace",
      icon: Users,
      iconBgColor: "bg-blue-500/20",
      iconColor: "text-blue-600",
    },
    {
      title: "Admins",
      value: roleSummary.admins,
      description: `of ${roleSummary.total} total`,
      icon: Users,
      iconBgColor: "bg-purple-500/20",
      iconColor: "text-purple-600",
    },
    {
      title: "Members",
      value: roleSummary.teamMembers,
      description: "non-admin users",
      icon: Users,
      iconBgColor: "bg-emerald-500/20",
      iconColor: "text-emerald-600",
    },
  ], [roleSummary]);

  if (isInitialLoading) {
    return <div className="p-6">Loading members...</div>;
  }

  // Handle inviting a new member to the workspace. This function interacts with the organization object from Clerk to send an invitation email to the specified address with the selected role. It also provides user feedback through toast notifications for loading, success, and error states, ensuring that users are informed about the status of their invitation actions.
  const handleInvite = async ({ email, role, }: { email: string; role: Role; }) => {
    try {
      if (!organization) {
        toast.error("Organization not found");
        return;
      }

      const invitePromise = organization.inviteMember({
        emailAddress: email,
        role,
      });

      toast.promise(invitePromise, {
        loading: "Sending invitation...",
        success: `Invitation sent to ${email}`,
        error: (err) =>
          err?.errors?.[0]?.message ||
          "Failed to send invitation",
      });

      await invitePromise;

      setIsInviteOpen(false);

    } catch (err) {
      console.error("Invite failed", err);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Team Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage team members, roles and contributions
          </p>
        </div>

        <Button
          onClick={() => setIsInviteOpen(true)}
          variant="gradient"
          className="inline-flex items-center gap-2 shadow-sm"
        >
          <UserPlus size={16} />
          Invite Member
        </Button>
      </header>

      {/* Stats */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stats.map((stat) => (
          <MetricCard key={stat.title} {...stat} />
        ))}
      </motion.section>

      {/* Search + Filter Section */}
      <FiltersBar<Role | "ALL">
        search={{
          value: query,
          onChange: setQuery,
          placeholder: "Search team members...",
        }}
        filters={[
          {
            value: roleFilter,
            onChange: setRoleFilter,
            placeholder: "Filter Role",
            options: [
              { label: "All", value: "ALL" },
              { label: "Admin", value: "ADMIN" },
              { label: "Member", value: "MEMBER" },
            ],
          },
        ]}
      />

      {/* Background Refresh Indicator */}
      {isBackgroundLoading && (
        <div className="flex items-center justify-end">
          <p className="text-xs text-muted-foreground animate-pulse">
            Refreshing team members...
          </p>
        </div>
      )}

      {/* Table or Empty State */}
      <section aria-label="Team members" className="min-h-[60vh]">
        {filteredMembers.length > 0 ? (
          <TeamTable members={filteredMembers} />
        ) : (
          <div className="w-full mt-2">
            <EmptyState
              icon={<Users className="text-blue-500 size-10 sm:size-12" />}
              title="No team members found"
              description="Adjust your filters or invite a new member."
              action={
                <PrimaryButton
                  onClick={() => setIsInviteOpen(true)}
                  icon={<UserPlus className="size-4" />}
                >
                  Invite Member
                </PrimaryButton>
              }
            />
          </div>
        )}
      </section>

      {/* Dialog */}
      <InviteMemberDialog
        isOpen={isInviteOpen}
        setIsOpen={setIsInviteOpen}
        onInvite={handleInvite}
      />
    </div>
  );
}