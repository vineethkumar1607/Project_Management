import type { Project } from "~/components/ProjectCard";

interface ProjectFilters {
  searchTerm: string;
  status: string;
  priority: string;
}

// Pure utility: returns a new filtered array without mutating input
export function filterProjects(
  projects: Project[],
  filters: ProjectFilters
): Project[] {
  const { searchTerm, status, priority } = filters;

  return projects.filter((project) => {
    // Case-insensitive name search
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Allow "ALL" to bypass filtering
    const matchesStatus =
      status === "ALL" || project.status === status;

    const matchesPriority =
      priority === "ALL" || project.priority === priority;

    // Project must satisfy all conditions
    return matchesSearch && matchesStatus && matchesPriority;
  });
}