import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import ProjectCard from "~/features/projects/ProjectCard";
import type { Project } from "~/types/workspace";
import { filterProjects } from "~/lib/filterProjects";
import CreateProjectDialogBox from "~/features/projects/CreateProjectDialogBox";
import PrimaryButton from "~/components/common/PrimaryButton";
import { useDebounce } from "~/hooks/useDebounce";
import FiltersBar from "~/components/common/FiltersBar";
import { useProjectsData } from "~/features/projects/hooks/useProjectsData";
import { FolderOpen, CheckCircle, Clock, ClipboardList } from "lucide-react";
import { useProjectAnalytics } from "~/features/projects/hooks/useProjectAnalytics";
import MetricCard from "~/components/common/MetricCard";
import ErrorState from "~/components/common/ErrorState";
import EmptyState from "~/components/common/EmptyState";
import StatsGridSkeleton from "~/components/skeletons/StatsGridSkeleton";
import { TextSkeleton } from "~/components/skeletons/TextSkeleton";
import ProjectCardSkeleton from "~/components/skeletons/ProjectCardSkeleton";
import { fetchProjects } from "~/store/thunks/projectThunk";
import { useAppDispatch } from "~/store/hooks";

import { useActiveWorkspace } from "~/features/workspace/hooks/useActiveWorkspace";

// Projects page component that displays a list of projects with filtering options, metrics, and the ability to create new projects. It uses the useProjectsData hook to fetch project data and analytics, and manages local state for search and filter criteria. The component also handles loading and error states, providing skeletons and error messages as needed.
const Projects = () => {
  const { projects, loading, error } = useProjectsData();

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


  const dispatch = useAppDispatch();

  const { currentWorkspaceId: workspaceId } = useActiveWorkspace();


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


  if (loading) {
    return (
      <div className="space-y-8">

        {/* Header Skeleton */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <TextSkeleton className="h-8 w-48" />
            <TextSkeleton className="h-4 w-72" />
          </div>

          <TextSkeleton className="h-10 w-36 rounded-md" />
        </header>

        {/* Metrics Skeleton */}
        <StatsGridSkeleton />

        {/* Filters Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <TextSkeleton className="h-10 flex-1 rounded-md" />

          <TextSkeleton className="h-10 w-[180px] rounded-md" />

          <TextSkeleton className="h-10 w-[180px] rounded-md" />
        </div>

        {/* Project Cards Skeleton */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </section>
      </div>
    );
  }
  /* =======================
     Error
  ======================= */
  if (error) {
    return (
      <ErrorState
        title="Failed to load projects"
        description="Unable to fetch projects right now."
        onRetry={() => {
          if (workspaceId) {
            dispatch(fetchProjects(workspaceId));
          }
        }}
      />
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

  /* =======================
   Filter Configurations
======================= */

  const projectFilters = [
    {
      value: status,
      onChange: setStatus,
      placeholder: "Status",
      options: [
        { label: "All Status", value: "ALL", },
        { label: "Active", value: "ACTIVE" },
        { label: "Planning", value: "PLANNING", },
        { label: "On Hold", value: "ON_HOLD", },
        { label: "Completed", value: "COMPLETED", },
        { label: "Cancelled", value: "CANCELLED", },
      ],
    },
    {
      value: priority,
      onChange: setPriority,
      placeholder: "Priority",
      options: [
        { label: "All Priority", value: "ALL", },
        { label: "High", value: "HIGH", },
        { label: "Medium", value: "MEDIUM", },
        { label: "Low", value: "LOW", },
      ],
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
        filters={projectFilters} />

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<FolderOpen className="size-10 text-blue-500" />}
          title="No projects found"
          description="Try adjusting your filters or create a new project."
          action={
            <PrimaryButton
              onClick={() => setOpen(true)}
              icon={<Plus className="size-4" />}
            >
              Create Project
            </PrimaryButton>
          }
        />
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