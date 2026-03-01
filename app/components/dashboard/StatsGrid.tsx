import StatsCard from "~/components/StatsCard"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface StatItem {

  title: string

  value: string | number

  icon: LucideIcon

  description?: string

  iconBgColor?: string

  iconColor?: string
}

interface StatsGridProps {

  stats: StatItem[]
}


/*
  Container animation

  staggers card animation
*/
const containerVariants = {

  hidden: { opacity: 0 },

  show: {

    opacity: 1,

    transition: {

      staggerChildren: 0.08,
    },
  },
}


/*
  individual card animation
*/
const cardVariants = {

  hidden: {

    opacity: 0,
    y: 20,
  },

  show: {

    opacity: 1,

    y: 0,

    transition: {

      duration: 0.4,

      ease: [0.16, 1, 0.3, 1],
    },
  },
}



/*
  reusable stats grid

  responsibilities:

  layout
  animation
  rendering reusable card

  no business logic
*/
function StatsGrid({ stats }: StatsGridProps) {

  return (

    <motion.section

      aria-label="Statistics"

      variants={containerVariants}

      initial="hidden"

      animate="show"

      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
        my-9
      "
    >

      {stats.map((stat) => (

        <motion.div

          key={stat.title}

          variants={cardVariants}

          whileHover={{
            y: -4,
            scale: 1.02,
          }}

          transition={{
            type: "spring",
            stiffness: 300,
          }}
        >

          <StatsCard

            {...stat}

          />

        </motion.div>

      ))}

    </motion.section>

  )
}


export default StatsGrid