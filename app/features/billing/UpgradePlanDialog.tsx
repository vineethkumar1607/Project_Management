import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "~/components/ui/dialog";

import PrimaryButton from "~/components/common/PrimaryButton";


import PricingTableContent from "./PricingTableContent";
import { useState } from "react";

interface UpgradePlanDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type Plan = "FREE" | "PRO" | "ENTERPRISE";

type BillingCycle =
    | "MONTHLY"
    | "QUARTERLY"
    | "YEARLY";

export default function UpgradePlanDialog({ open, onOpenChange, }: UpgradePlanDialogProps) {

    const [selectedPlan, setSelectedPlan] = useState<Plan>("PRO");

    const [billingCycle, setBillingCycle] = useState<BillingCycle>("QUARTERLY");

    const buttonText = selectedPlan === "FREE" ? "Current Plan"
        : selectedPlan === "PRO" ? `Upgrade to Pro (${billingCycle.toLowerCase()})`
            : `Upgrade to Enterprise (${billingCycle.toLowerCase()})`;


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className=" w-[95vw] sm:w-[90vw] lg:w-[60vw] max-w-6xl max-h-[90vh] overflow-hidden p-0 " >
                <div className="flex max-h-[90vh] flex-col">

                    <DialogHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
                        <DialogTitle>
                            Upgrade Your Plan
                        </DialogTitle>

                        <DialogDescription>
                            Choose the plan that best fits your workspace.
                        </DialogDescription>

                        <div className="mt-4 flex justify-center">
                            <div className="inline-flex rounded-xl border bg-muted p-1">

                                {(["MONTHLY", "QUARTERLY", "YEARLY",] as BillingCycle[]).map((cycle) => (

                                    <button key={cycle} type="button"
                                        onClick={() => setBillingCycle(cycle)}
                                        className={` rounded-lg px-4 py-2 text-sm font-medium transition-colors
                                             ${billingCycle === cycle ? `bg-background shadow-sm text-amber-500 border border-amber-500/40` : ` text-muted-foreground hover:text-foreground`}`}
                                    >
                                        {cycle === "MONTHLY" && "Monthly"}

                                        {cycle === "QUARTERLY" && "Quarterly"}

                                        {cycle === "YEARLY" && "Yearly"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4 sm:px-6 sm:pb-6">
                        <PricingTableContent
                            selectedPlan={selectedPlan}
                            onSelect={setSelectedPlan}
                            billingCycle={billingCycle}
                        />
                    </div>

                    <div className="flex justify-stretch p-4 sm:justify-end">
                        <div className="flex justify-end">
                            <PrimaryButton className="w-full sm:w-auto" disabled={selectedPlan === "FREE"}>
                                {buttonText}
                            </PrimaryButton>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}