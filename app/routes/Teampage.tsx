import { useState } from "react";
import { Users, FolderOpen, ListChecks, UserPlus } from "lucide-react";
import StatsGrid from "~/components/dashboard/StatsGrid";
import SearchInput from "~/components/SearchInput";
import TeamTable from "~/components/TeamTable";
import InviteMemberDialog from "../components/InviteMemberDialog"
import { Button } from "~/components/ui/button";

export default function TeamPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isInviteOpen, setIsInviteOpen] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        console.log("Searching for:", query);
    };

    const stats = [
        {
            title: "Total Members",
            value: 3,
            icon: Users,
            iconBgColor: "bg-blue-500/10",
            iconColor: "text-blue-500",
        },
        {
            title: "Active Projects",
            value: 2,
            icon: FolderOpen,
            iconBgColor: "bg-green-500/10",
            iconColor: "text-green-500",
        },
        {
            title: "Total Tasks",
            value: 6,
            icon: ListChecks,
            iconBgColor: "bg-purple-500/10",
            iconColor: "text-purple-500",
        },
    ];

    const members = [
        { id: "1", name: "Vineeth ", email: "oliverwatts@example.com", role: "ADMIN" as const },
        { id: "2", name: "Shruthi", email: "alexsmith@example.com", role: "ADMIN" as const },
        { id: "3", name: "Rahul", email: "johnwarrel@example.com", role: "ADMIN" as const },
    ];

    // Logic to filter members based on search (to be connected with your debounce hook)
    const filteredMembers = members.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="space-y-6 p-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Team</h1>
                    <p className="text-muted-foreground text-sm">
                        Manage team members and their contributions
                    </p>
                </div>

                <Button
                    onClick={() => setIsInviteOpen(true)}
                    variant="gradient"
                    className="inline-flex items-center gap-2"
                >
                    <UserPlus size={16} />
                    Invite Member
                </Button>

                <InviteMemberDialog
                    isOpen={isInviteOpen}
                    setIsOpen={setIsInviteOpen}
                />
            </header>

            <StatsGrid stats={stats} />

            <SearchInput
                placeholder="Search team members..."
                onSearch={handleSearch}
            />

            <TeamTable members={filteredMembers} />
        </main>
    );
}