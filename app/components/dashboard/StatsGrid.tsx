import { FolderOpen, CheckCircle, Users, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import StatsGridSkeleton from "./StatsGridSkeleton";
import { motion, AnimatePresence } from "framer-motion";


/* =======================
   Component 
======================= */

export default function StatsGrid() {
  const [isLoading, setIsLoading] = useState(true);




  // Temporary static data 
  const [stats] = useState({
    totalProjects: 12,
    activeProjects: 7,
    completedProjects: 5,
    myTasks: 14,
    overdueIssues: 3,
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


  const statCards = [
    {
      icon: FolderOpen,
      title: "Total Projects",
      value: stats.totalProjects,
      subtitle: "projects in workspace",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
    {
      icon: CheckCircle,
      title: "Completed Projects",
      value: stats.completedProjects,
      subtitle: `of ${stats.totalProjects} total`,
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-500",
    },
    {
      icon: Users,
      title: "My Tasks",
      value: stats.myTasks,
      subtitle: "assigned to me",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
    },
    {
      icon: AlertTriangle,
      title: "Overdue",
      value: stats.overdueIssues,
      subtitle: "need attention",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-500",
    },
  ];


  const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
     ease: [0.16, 1, 0.3, 1]
    },
  },
};


 return (
  <AnimatePresence mode="wait">
    {isLoading ? (
      <motion.div
        key="skeleton"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <StatsGridSkeleton />
      </motion.div>
    ) : (
      <motion.div
        key="content"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-9"
      >
        {statCards.map(
          ({ icon: Icon, title, value, subtitle, bgColor, textColor }, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-zinc-950 dark:bg-linear-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-md"
            >
              <div className="p-6 py-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                      {title}
                    </p>
                    <p className="text-3xl font-bold text-zinc-800 dark:text-white">
                      {value}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                      {subtitle}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${bgColor}`}>
                    <Icon size={20} className={textColor} />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

}
