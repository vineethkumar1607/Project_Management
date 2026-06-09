import type { BillingCycle, Plan, FeatureValue, } from "~/types/workspace";

type PricingPlan = {
    id: Plan;
    name: string;
    description: string;
    prices: Record<BillingCycle, number>;
    originalPrices: Record<BillingCycle, number>;
    discounts: Record<BillingCycle, number>;
};

type FeatureSection = {
    title: string;
    rows: { label: string; values: Record<Plan, FeatureValue>; }[];
};


export const PLANS: PricingPlan[] = [
    {
        id: "FREE",
        name: "Free",
        description: "For individuals",
        prices: { MONTHLY: 0, QUARTERLY: 0, YEARLY: 0, },
        originalPrices: { MONTHLY: 0, QUARTERLY: 0, YEARLY: 0, },
        discounts: { MONTHLY: 0, QUARTERLY: 0, YEARLY: 0, },
    },

    {
        id: "PRO",
        name: "Pro",
        description: "Best for growing teams",
        prices: { MONTHLY: 299, QUARTERLY: 849, YEARLY: 3229, },
        originalPrices: { MONTHLY: 299, QUARTERLY: 897, YEARLY: 3588, },
        discounts: { MONTHLY: 0, QUARTERLY: 5, YEARLY: 10, },
    },

    {
        id: "ENTERPRISE",
        name: "Enterprise",
        description: "For large organizations",
        prices: { MONTHLY: 999, QUARTERLY: 2699, YEARLY: 10199, },
        originalPrices: { MONTHLY: 999, QUARTERLY: 2997, YEARLY: 11988, },
        discounts: { MONTHLY: 0, QUARTERLY: 10, YEARLY: 15, },
    },
];



export const FEATURE_SECTIONS: FeatureSection[] = [
    {
        title: "Usage Limits",
        rows: [
            { label: "Projects", values: { FREE: "1", PRO: "10", ENTERPRISE: "Unlimited", }, },
            { label: "Team Members", values: { FREE: "2", PRO: "10", ENTERPRISE: "Unlimited", }, },
        ],
    },
    {
        title: "Core Features",
        rows: [
            { label: "Task Management", values: { FREE: true, PRO: true, ENTERPRISE: true, }, },
            { label: "Kanban Board", values: { FREE: true, PRO: true, ENTERPRISE: true, }, },
            { label: "Calendar View", values: { FREE: true, PRO: true, ENTERPRISE: true, }, },
        ],
    },

    {
        title: "Premium Features",
        rows: [
            {
                label: "Analytics Dashboard",
                values: { FREE: false, PRO: true, ENTERPRISE: true, },
            },
            {
                label: "Priority Support",
                values: { FREE: false, PRO: true, ENTERPRISE: true, },
            },
        ],
    },

    {
        title: "Enterprise Features",
        rows: [
            {
                label: "Custom Limits",
                values: { FREE: false, PRO: false, ENTERPRISE: true, },
            },
            {
                label: "Dedicated Support",
                values: { FREE: false, PRO: false, ENTERPRISE: true, },
            },
        ],
    },
];
