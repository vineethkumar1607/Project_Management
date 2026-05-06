import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import ProjectCard from "~/components/ProjectCard";
import type { Project } from "~/types/workspace";
import { filterProjects } from "~/lib/filterProjects";
import ProjectOverviewSkeleton from "~/components/ui/ProjectOverviewSkeleton";
import CreateProjectDialogBox from "~/components/CreateProjectDialogBox";
import PrimaryButton from "~/components/Common/PrimaryButton";
import { useDebounce } from "~/hooks/useDebounce";
import FiltersBar from "~/components/Common/FiltersBar";
import { useProjects } from "~/hooks/useProjects";
import { FolderOpen, CheckCircle, Clock, ClipboardList } from "lucide-react";
import { useProjectAnalytics } from "~/hooks/useProjectAnalytics";
import MetricCard from "~/components/MetricCard";


const Projects = () => {

  const { projects, loading, error } = useProjects();

  const analytics = useProjectAnalytics(projects);
  /* =======================
     UI State
  ======================= */
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setSearchTerm(debouncedQuery);
  }, [debouncedQuery]);

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

  const metrics = [
    {
      title: "Total Projects",
      value: analytics.totalProjects,
      description: "all workspace projects",
      icon: FolderOpen,
      iconBgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Completed",
      value: analytics.completedProjects,
      description: "successfully finished",
      icon: CheckCircle,
      iconBgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      title: "Active",
      value: analytics.activeProjects,
      description: "currently in progress",
      icon: Clock,
      iconBgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      title: "Planning",
      value: analytics.planningProjects,
      description: "in planning phase",
      icon: ClipboardList,
      iconBgColor: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
  ];

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
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            {...metric}
            isLoading={loading}
          />
        ))}
      </section>

      {/* Filters */}
      <FiltersBar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: "Search projects...",
        }}
        filters={[
          {
            value: status,
            onChange: setStatus,
            placeholder: "Status",
            options: [
              { label: "All Status", value: "ALL" },
              { label: "Active", value: "ACTIVE" },
              { label: "Planning", value: "PLANNING" },
              { label: "On Hold", value: "ON_HOLD" },
              { label: "Completed", value: "COMPLETED" },
              { label: "Cancelled", value: "CANCELLED" },
            ],
          },
          {
            value: priority,
            onChange: setPriority,
            placeholder: "Priority",
            options: [
              { label: "All Priority", value: "ALL" },
              { label: "High", value: "HIGH" },
              { label: "Medium", value: "MEDIUM" },
              { label: "Low", value: "LOW" },
            ],
          },
        ]}
      />

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