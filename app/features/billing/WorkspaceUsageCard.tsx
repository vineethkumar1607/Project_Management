import { Activity, AlertTriangle, Info } from "lucide-react";

import { AnimatedUsageCard, AnimatedUsageCardMeter, } from "~/components/ui/animated-usage-card";

interface WorkspaceUsageCardProps {
  projectsUsed: number;
  projectsLimit: number;
  membersUsed: number;
  membersLimit: number;
}

export default function WorkspaceUsageCard({ projectsUsed, projectsLimit, membersUsed, membersLimit }: WorkspaceUsageCardProps) {


  const projectsPercentage = Math.round((projectsUsed / projectsLimit) * 100);

  const membersPercentage = Math.round((membersUsed / membersLimit) * 100);

  const highestUsage = Math.max(projectsPercentage, membersPercentage);

  const isWarning = highestUsage >= 70;
  const isCritical = highestUsage >= 90;

  return (
    <AnimatedUsageCard className="h-full">
      <div className="p-6">
        <header className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
            <Activity size={20} className="text-emerald-500" />
          </div>

          <h3 className="text-xl font-semibold">
            Workspace Usage
          </h3>
        </header>

        <section aria-label="Workspace usage" className="mt-8 space-y-6">
          <AnimatedUsageCardMeter
            used={projectsUsed}
            limit={projectsLimit}
            label="Projects"
            showPercentage
          />

          <div className="border-t" />

          <AnimatedUsageCardMeter
            used={membersUsed}
            limit={membersLimit}
            label="Members"
            showPercentage
          />
        </section>

        <aside className="mt-8 rounded-xl border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            {isCritical ? (
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            ) : (
              <Info size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
            )}

            <p className="text-sm text-muted-foreground">
              {isCritical
                ? "Workspace limits are almost exhausted. Upgrade now to avoid interruptions." : isWarning
                  ? "You're approaching your workspace limits. Consider upgrading your plan."
                  : "You still have available workspace capacity."}
            </p>
          </div>
        </aside>
      </div>
    </AnimatedUsageCard>
  );
}