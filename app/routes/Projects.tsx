import { useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";

import ProjectCard from "~/components/ProjectCard";
import type { Project } from "~/components/ProjectCard";

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Revamping UI and improving UX",
    status: "ACTIVE",
    priority: "HIGH",
    progress: 60,
  },
  {
    id: "2",
    name: "Mobile App MVP",
    description: "Initial Android & iOS build",
    status: "PLANNING",
    priority: "MEDIUM",
    progress: 20,
  },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ---------------- Header ---------------- */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track your workspace projects
          </p>
        </div>

        <Button  variant="gradient" >
          <Plus className="size-4 mr-2" />
          New Project
        </Button>
      </header>

      {/* ---------------- Search + Filters ---------------- */}
      <section className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="PLANNING">Planning</SelectItem>
            <SelectItem value="ON_HOLD">On Hold</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority */}
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Priority</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* ---------------- Projects Grid ---------------- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </main>
  );
};

export default Projects;
