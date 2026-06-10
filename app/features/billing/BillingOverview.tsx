import { Suspense, useState } from "react";
import CurrentPlanCard from "~/features/billing/CurrentPlanCard";
import WorkspaceUsageCard from "~/features/billing/WorkspaceUsageCard";
import UpgradePlanDialog from "./UpgradePlanDialog";
import BillingHistory, { type BillingInvoice } from "./BillingHistory";
import { invoices } from "./billingConfig";
import { Card, CardContent } from "~/components/ui/card";
import { Lock } from "lucide-react";

export default function BillingOverview() {
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  // const handleDownload = (invoice: BillingInvoice) => { window.open(`/api/workspaces/${workspaceId}/billing/invoices/${invoice.id}/download`, "_blank"); };

  const handleDownload = (
    invoice: BillingInvoice
  ) => {
    console.log(
      "Download invoice:",
      invoice.id
    );
  };

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

      {/* Top cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CurrentPlanCard
          plan="FREE"
          projectsUsed={3}
          projectsLimit={5}
          membersUsed={2}
          membersLimit={3}
          onUpgrade={() =>
            setIsUpgradeOpen(true)
          }
        />

        <WorkspaceUsageCard
          projectsUsed={4}
          projectsLimit={5}
          membersUsed={2}
          membersLimit={3}
        />
      </div>

      {/* Full-width Billing History */}
      <BillingHistory
        invoices={invoices}
        onDownload={handleDownload}
      />

      <Card>
        <CardContent className="flex items-center gap-2 px-6 text-sm text-muted-foreground">
          <Lock className="size-4 shrink-0" />

          <span>
            Secure billing powered by
          </span>

          <img
             src="/razorpay-logo.svg"
            alt="Razorpay"
            className="h-5 w-auto"
          />
        </CardContent>
      </Card>

      <Suspense fallback={null}>
        {isUpgradeOpen && (
          <UpgradePlanDialog
            open={isUpgradeOpen}
            onOpenChange={
              setIsUpgradeOpen
            }
          />
        )}
      </Suspense>
    </div>
  );
}