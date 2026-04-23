import { Card } from "~/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion";

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string

    // allows grid to control colors dynamically
    iconBgColor?: string
    iconColor?: string

    // allows parent to attach animation / className
    className?: string
}

/*
  Reusable statistics card

  Design goals:
  - fully reusable
  - animation friendly
  - design system compliant
  - supports theming
*/
function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    iconBgColor = "bg-muted",
    iconColor = "text-muted-foreground",
    className = "",
    isLoading = false,
}: StatsCardProps & { isLoading?: boolean }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4 },
                },
            }}
        >
            <Card
                className={`
          p-6 py-4
          bg-white dark:bg-zinc-950
          border border-zinc-200 dark:border-zinc-800
          hover:border-zinc-300 dark:hover:border-zinc-700
          hover:shadow-md hover:-translate-y-1
          transition-all duration-200
          rounded-xl
          ${className}
        `}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                            {title}
                        </p>

                        <p className="text-3xl font-bold text-zinc-800 dark:text-white">
                            {isLoading ? "..." : value}
                        </p>

                        {description && (
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                                {description}
                            </p>
                        )}
                    </div>

                    <div className={`p-3 rounded-xl ${iconBgColor}`}>
                        <Icon size={20} className={iconColor} />
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

export default StatsCard