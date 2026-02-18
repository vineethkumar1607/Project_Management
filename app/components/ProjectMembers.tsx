import { Button } from "~/components/ui/button"
import AddMemberDialog from "./AddMemberDialog"

 const PROJECT_ROLES = {
  MEMBER: "MEMBER",
  TEAM_LEAD: "TEAM_LEAD",
}

const mockMembers = [
  { id: 1, name: "John Doe", role: "TEAM_LEAD" },
  { id: 2, name: "Jane Smith", role: "MEMBER" },
]

export default function ProjectMembers() {
  return (
    <div className="mt-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Project Members</h2>
        <AddMemberDialog />
      </div>

      <div className="space-y-4">
        {mockMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>

            <div className="flex gap-2 mt-3 sm:mt-0">
              <Button variant="outline" size="sm">
                Change Role
              </Button>
              <Button variant="destructive" size="sm">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
