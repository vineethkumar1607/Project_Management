import { PricingTable, PricingTableBody, PricingTableCell, PricingTableFeatureCell, PricingTableFeatureLabel, PricingTableHeader, PricingTablePlan, PricingTablePlanDescription, PricingTablePlanName, PricingTablePrice, PricingTableRow, PricingTableSpacer, } from "~/components/ui/pricing-table";

import { FEATURE_SECTIONS, PLANS, } from "./billingConfig";
import type { BillingCycle, Plan } from "~/types/workspace";
import { motion } from "framer-motion";


interface PricingTableContentProps {
    selectedPlan: Plan;
    onSelect: (plan: Plan) => void;
    billingCycle: BillingCycle;
}

export default function PricingTableContent({ selectedPlan, onSelect, billingCycle, }: PricingTableContentProps) {

    const isHighlighted = (
        plan: Plan
    ) => selectedPlan === plan;

    return (
        <section aria-labelledby="feature-comparison" className="space-y-4" >
            <h2 id="feature-comparison" className="text-lg font-semibold" >
                Feature Comparison
            </h2>

            <p className="text-sm text-muted-foreground lg:hidden">
                Swipe horizontally to compare plans.
            </p>

            <div className="overflow-x-auto scrollbar-hide lg:overflow-visible">
                <div className="min-w-[850px] lg:min-w-full">
                    <PricingTable className="w-full">
                        <PricingTableHeader columns={4}>
                            <PricingTableSpacer />
                            {PLANS.map((plan) => (

                                <motion.div
                                    key={plan.id}
                                    layout
                                    animate={{
                                        scale: selectedPlan === plan.id ? 1.02 : 1,
                                        y: selectedPlan === plan.id ? -4 : 0,
                                    }}
                                    transition={{
                                        layout: {
                                            type: "spring",
                                            stiffness: 250,
                                            damping: 20,
                                        },
                                        scale: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25,
                                        },
                                    }}
                                >

                                    <PricingTablePlan
                                        highlighted={false}
                                        className={
                                            selectedPlan === plan.id
                                                ? "shadow-2xl bg-amber-50/40 dark:bg-amber-500/5"
                                                : ""
                                        }
                                        onClick={() => onSelect(plan.id)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <PricingTablePlanName className="text-2xl font-bold text-amber-500">
                                            {plan.name}
                                        </PricingTablePlanName>

                                        <div className="mt-4 space-y-1">
                                            {plan.discounts[billingCycle] > 0 ? (
                                                <p className="text-lg font-medium text-muted-foreground line-through">
                                                    ₹{plan.originalPrices[billingCycle]}
                                                </p>
                                            ) : (
                                                <div className="h-7" />
                                            )}

                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-end justify-center gap-1"
                                            >
                                                <PricingTablePrice
                                                    amount={plan.prices[billingCycle]}
                                                    currency="₹"
                                                />

                                                <span className="text-sm text-muted-foreground">
                                                    {{
                                                        MONTHLY: "/month",
                                                        QUARTERLY: "/quarter",
                                                        YEARLY: "/year",
                                                    }[billingCycle]}
                                                </span>

                                            </motion.div>

                                            {plan.discounts[billingCycle] > 0 ? (
                                                <motion.span
                                                    initial={{ opacity: 0, y: -5, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="inline-flex items-center justify-center rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600"
                                                >
                                                    Save {plan.discounts[billingCycle]}%
                                                </motion.span>
                                            ) : (
                                                <div className="h-8" />
                                            )}
                                        </div>

                                        <PricingTablePlanDescription>
                                            {plan.description}
                                        </PricingTablePlanDescription>

                                    </PricingTablePlan>
                                </motion.div>
                            ))}
                        </PricingTableHeader>

                        <PricingTableBody>
                            {FEATURE_SECTIONS.map((section) => (
                                <div key={section.title}>
                                    <PricingTableFeatureLabel>
                                        {section.title}
                                    </PricingTableFeatureLabel>

                                    {section.rows.map((row) => (
                                        <PricingTableRow key={row.label} columns={4}>
                                            <PricingTableFeatureCell>
                                                {row.label}
                                            </PricingTableFeatureCell>

                                            {PLANS.map((plan) => (
                                                <PricingTableCell
                                                    key={plan.id}
                                                    value={row.values[plan.id]}
                                                    highlighted={selectedPlan === plan.id}
                                                    className={
                                                        selectedPlan === plan.id
                                                            ? "transition-all duration-300"
                                                            : ""
                                                    }
                                                />
                                            ))}
                                        </PricingTableRow>
                                    ))}
                                </div>
                            ))}
                        </PricingTableBody>
                    </PricingTable>
                </div>
            </div>
        </section>
    );
}