import ProjectCard from "~/components/ProjectCard"


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
  {
    id: "3",
    name: "Backend Refactor",
    description: "Optimize API performance and DB queries",
    status: "ON_HOLD",
    priority: "HIGH",
    progress: 45,
  },
  {
    id: "4",
    name: "Marketing Campaign",
    description: "Launch Q2 paid ads and SEO strategy",
    status: "COMPLETED",
    priority: "LOW",
    progress: 100,
  },
  {
    id: "5",
    name: "Internal Tooling",
    description: "Build admin analytics dashboard",
    status: "ACTIVE",
    priority: "CRITICAL",
    progress: 75,
  },
];

const ProjectsPage = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsPage
