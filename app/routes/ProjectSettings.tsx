// ProjectSettings.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import ProjectDetailsForm from "~/components/ProjectDetailsForm"
import ProjectMembers from "~/components/ProjectMembers"

export default function ProjectSettings() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-semibold mb-6">Project Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <ProjectDetailsForm />
        </TabsContent>

        <TabsContent value="members">
          <ProjectMembers />
        </TabsContent>
      </Tabs>
    </div>
  )
}
