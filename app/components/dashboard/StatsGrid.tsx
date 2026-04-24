import { FolderOpen, CheckCircle, Users, AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import type { RootState } from "~/store/store";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "~/components/StatsCard";
import StatsGridSkeleton from "./StatsGridSkeleton";

interface StatItem {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

function StatsGrid() {


  const workspaceId = useSelector(
    (state: RootState) => state.workspace.currentWorkspaceId
  );

  const projectData = useSelector((state: RootState) =>
    workspaceId
      ? state.project.projectsByWorkspace[workspaceId]
      : null
  );

  const projects = projectData?.data || [];
  const stats = useMemo(() => {
    const totalProjects = projects.length;

    const completedProjects = projects.filter(
      (p) => p.status === "COMPLETED"
    ).length;

    const myTasks = projects.reduce((acc, project) => {
      const tasks = (project as any).tasks ?? [];
      return (
        acc +
        tasks.filter(
          (t: any) => t.assignee?.email === "user@email.com"
        ).length
      );
    }, 0);

    const overdueIssues = projects.reduce((acc, project) => {
      const tasks = (project as any).tasks ?? [];
      return (
        acc +
        tasks.filter(
          (t: any) => new Date(t.due_date) < new Date()
        ).length
      );
    }, 0);

    return {
      totalProjects,
      completedProjects,
      myTasks,
      overdueIssues,
    };
  }, [projects]);

  const statCards: StatItem[] = [
    {
      icon: FolderOpen,
      title: "Total Projects",
      value: stats.totalProjects,
      description: "projects in workspace",
      iconBgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: CheckCircle,
      title: "Completed Projects",
      value: stats.completedProjects,
      description: `of ${stats.totalProjects} total`,
      iconBgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      icon: Users,
      title: "My Tasks",
      value: stats.myTasks,
      description: "assigned to me",
      iconBgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: AlertTriangle,
      title: "Overdue",
      value: stats.overdueIssues,
      description: "need attention",
      iconBgColor: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
  ];

  const isInitialLoading = !projectData;
  if (isInitialLoading) {
    return <StatsGridSkeleton />;
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-9"
    >
      {statCards.map((stat) => (
        <motion.div key={stat.title} variants={cardVariants}>
          <StatsCard {...stat} />
        </motion.div>
      ))}
    </motion.section>
  );
}

export default StatsGrid;