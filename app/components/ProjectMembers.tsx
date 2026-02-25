import { Button } from "~/components/ui/button"
import AddMemberDialog from "./AddMemberDialog"

const PROJECT_ROLES = {
  MEMBER: "MEMBER",
  TEAM_LEAD: "TEAM_LEAD",
}

const mockMembers = [
  { id: 1, name: "Vineeth", role: "TEAM_LEAD" },
  { id: 2, name: "Shruthi", role: "MEMBER" },
  { id: 3, name: "Rahul", role: "MEMBER" },
]

const ProjectMembers = () => {
  return (
    <section aria-labelledby="project-members-heading" className="space-y-6">

      {/* Header */}
      <header className="flex justify-between items-center">
        <h2 id="project-members-heading" className="text-lg font-medium">
          Project Members
        </h2>
        <AddMemberDialog />
      </header>

      {/* Members List */}
      <ul className="space-y-4">
        {mockMembers.map((member) => (
          <li
            key={member.id}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-start gap-4">

              {/* Member Info */}
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">
                  {member.role}
                </p>
              </div>

              {/* Actions */}
              <div
                className="flex flex-col gap-2 items-end sm:flex-row sm:items-center sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-28 sm:w-auto"
                  aria-label={`Change role of ${member.name}`}
                >
                  Change Role
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-28 sm:w-auto"
                  aria-label={`Remove ${member.name} from project`}
                >
                  Remove
                </Button>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProjectMembers
