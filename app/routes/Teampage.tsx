import { useState, useMemo, useEffect, Suspense } from "react";
import { Users, FolderOpen, ListChecks, UserPlus } from "lucide-react";
import StatsGrid from "~/components/dashboard/StatsGrid";

import TeamTable from "~/components/TeamTable";
import InviteMemberDialog from "../components/InviteMemberDialog";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { useOrganization } from "@clerk/clerk-react";
import type { Role } from "~/types/workspace";
import PrimaryButton from "~/components/Common/PrimaryButton";
import { useDebounce } from "~/hooks/useDebounce";
import FiltersBar from "~/components/Common/FiltersBar";


export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "ALL">("ALL");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const { organization, isLoaded } = useOrganization();

  const [memberships, setMemberships] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    if (!organization) return;

    const loadMembers = async () => {
      const res = await organization.getMemberships();
      setMemberships(res.data);
    };

    loadMembers();
  }, [organization]);



  useEffect(() => {
    console.log("ORG:", organization);
  }, [organization]);


  const members = memberships.map((m: any) => ({
    id: m.publicUserData?.userId || "",
    name: m.publicUserData?.firstName || "User",
    email: m.publicUserData?.identifier || "",
    role: m.role,
  }));

  // Memoized role summary
  const roleSummary = useMemo(() => {
    const admins = members.filter((m) => m.role === "org:admin").length;
    const teamMembers = members.filter((m) => m.role === "org:member").length;

    return {
      admins,
      teamMembers,
      total: members.length,
    };
  }, [members]);

  // Combined filtering
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = member.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === "ALL" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [members, searchQuery, roleFilter]);

  const stats = [
    {
      title: "Total Members",
      value: roleSummary.total,
      icon: Users,
      iconBgColor: "bg-blue-500/20",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Projects",
      value: 2,
      icon: FolderOpen,
      iconBgColor: "bg-emerald-500/20",
      iconColor: "text-emerald-600",
    },
    {
      title: "Total Tasks",
      value: 6,
      icon: ListChecks,
      iconBgColor: "bg-purple-500/20",
      iconColor: "text-purple-600",
    },
  ];


  const handleInvite = async ({ email, role }: { email: string; role: Role }) => {
    try {
      if (!organization) return;

      console.log(" Sending invite...");

      await organization.inviteMember({
        emailAddress: email,
        role: role,
      });

      console.log(" Invite sent");

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
      <section aria-label="Team statistics">
        <Suspense fallback={<div className="h-24" />}>
          <StatsGrid stats={stats} />
        </Suspense>
      </section>

      {/* Role Summary */}
      <section className="flex flex-wrap gap-2">
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          Total: {roleSummary.total}
        </Badge>

        <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
          Admins: {roleSummary.admins}
        </Badge>

        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          Members: {roleSummary.teamMembers}
        </Badge>
      </section>

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
              { label: "Admin", value: "org:admin" },
              { label: "Member", value: "org:member" },
            ],
          },
        ]}
      />
      {/* Table or Empty State */}
      <section aria-label="Team members" className="min-h-[60vh]">
        {filteredMembers.length > 0 ? (
          <TeamTable members={filteredMembers} />
        ) : (
          <div className="w-full mt-2">
            <div className="w-full text-center border rounded-xl p-6 sm:p-8 bg-card shadow-sm">

              <Users className="mx-auto mb-4 text-blue-500 size-10 sm:size-12" />

              <p className="text-lg sm:text-xl font-semibold">
                No team members found
              </p>

              <p className="text-muted-foreground text-sm mt-2">
                Adjust your filters or invite a new member.
              </p>

              <div className="mt-6 flex justify-center">
                <PrimaryButton
                  onClick={() => setIsInviteOpen(true)}
                  icon={<UserPlus className="size-4" />}
                >
                  Invite Member
                </PrimaryButton>
              </div>

            </div>
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