import { Suspense, useState } from "react";
import CurrentPlanCard from "~/features/billing/CurrentPlanCard";
import WorkspaceUsageCard from "~/features/billing/WorkspaceUsageCard";
import UpgradePlanDialog from "./UpgradePlanDialog";

export default function BillingOverview() {
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">
          Billing
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your subscription and workspace limits.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CurrentPlanCard
          plan="FREE"
          projectsUsed={3}
          projectsLimit={5}
          membersUsed={2}
          membersLimit={3}
          onUpgrade={() => setIsUpgradeOpen(true)}
        />

        <WorkspaceUsageCard
          projectsUsed={4}
          projectsLimit={5}
          membersUsed={2}
          membersLimit={3}
        />

        <Suspense fallback={null}>
        {isUpgradeOpen && (
          <UpgradePlanDialog
            open={isUpgradeOpen}
            onOpenChange={setIsUpgradeOpen}
          />
        )}
      </Suspense>
      </div>
    </div>
  );
}