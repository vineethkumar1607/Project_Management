import { useMemo, useState } from "react";
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
import type { Project } from "~/types/workspace";
import { filterProjects } from "~/lib/filterProjects";

import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import ProjectOverviewSkeleton from "~/components/ui/ProjectOverviewSkeleton";
import CreateProjectDialogBox from "~/components/CreateProjectDialogBox";
import PrimaryButton from "~/components/Common/PrimaryButton";

const Projects = () => {
  /* =======================
     Redux Data
  ======================= */
  const { projects, loading, error } = useSelector(
    (state: RootState) => state.project
  );

  /* =======================
     UI State
  ======================= */
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");
  const [open, setOpen] = useState(false);

  /* =======================
     Filtering
  ======================= */
  const filteredProjects = useMemo(
    () => filterProjects(projects, { searchTerm, status, priority }),
    [projects, searchTerm, status, priority]
  );

  /* =======================
     Loading
  ======================= */
  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <ProjectOverviewSkeleton />
      </div>
    );
  }

  /* =======================
     Error
  ======================= */
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center max-w-md w-full">
          <h2 className="text-lg font-semibold text-red-500 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-zinc-500 mb-4">
            Unable to load projects. Please try again.
          </p>

          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track your workspace projects
          </p>
        </div>

        <PrimaryButton
          onClick={() => setOpen(true)}
          icon={<Plus className="size-4" />}
        >
          New Project
        </PrimaryButton>

        {open && <CreateProjectDialogBox setIsDialogOpen={setOpen} />}
      </header>

      {/* Filters */}
      <section className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

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

        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Priority</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-sm text-zinc-500">
            No projects found
          </p>
        </div>
      ) : (
        /* Projects Grid */
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Projects;