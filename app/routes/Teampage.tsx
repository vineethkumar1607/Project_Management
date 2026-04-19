import { useState, useMemo, useEffect } from "react";
import { Users, FolderOpen, ListChecks, UserPlus } from "lucide-react";
import StatsGrid from "~/components/dashboard/StatsGrid";
import SearchInput from "~/components/SearchInput";
import TeamTable from "~/components/TeamTable";
import InviteMemberDialog from "../components/InviteMemberDialog";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { useOrganization } from "@clerk/clerk-react";
import type { Role } from "~/types/workspace";

type InvitePayload = {
  email: string;
  role: Role;
};

interface Member {
  id: string;
  name: string;
  email: string;
  // role: Role;
  role: "org:admin" | "org:member";
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "ALL">("ALL");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const { organization, isLoaded } = useOrganization();

  const [memberships, setMemberships] = useState<any[]>([]);

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

      console.log("🚀 Sending invite...");

      await organization.inviteMember({
        emailAddress: email,
        role: role,
      });

      console.log("✅ Invite sent");

      // 🛑 IMPORTANT: DO NOTHING AFTER THIS
      // ❌ No dispatch
      // ❌ No navigation
      // ❌ No refetch
    } catch (err) {
      console.error("Invite failed", err);
    }
  };

  return (
    <main className="max-w-7xl mx-auto space-y-10 p-6">

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
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
        <StatsGrid stats={stats} />
      </section>

      {/* Role Summary */}
      <section className="flex flex-wrap gap-3">
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
      <section className="bg-muted/40 shadow rounded-xl p-6 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">

        <div className="w-full lg:w-2/3">
          <SearchInput
            placeholder="Search team members..."
            onSearch={setSearchQuery}
          />
        </div>

        <Select
          value={roleFilter}
          onValueChange={(value: Role | "ALL") =>
            setRoleFilter(value)
          }
        >
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Filter Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MEMBER">Member</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Table or Empty State */}
      <section className=" min-h-[450px]  ">
        {filteredMembers.length > 0 ? (
          <TeamTable members={filteredMembers} />
        ) : (
          <div className="border rounded-xl p-12 text-center bg-card shadow-sm">
            <Users
              className="mx-auto mb-4 text-blue-500"
              size={40}
            />
            <p className="text-xl font-semibold">
              No team members found
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Adjust your filters or invite a new member.
            </p>

            <Button
              onClick={() => setIsInviteOpen(true)}
              variant="gradient"
              className="mt-6 inline-flex items-center gap-2"
            >
              <UserPlus size={16} />
              Invite Member
            </Button>
          </div>
        )}
      </section>

      {/* Dialog */}
      <InviteMemberDialog
        isOpen={isInviteOpen}
        setIsOpen={setIsInviteOpen}
        onInvite={handleInvite}
      />
    </main>
  );
}