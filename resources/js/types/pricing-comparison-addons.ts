import type { PlanComparisonCell } from '@/components/pricing/plan-comparison-rows';

export type PricingComparisonRow = {
    key: string;
    label: string;
    description: string;
    free: PlanComparisonCell;
    growth: PlanComparisonCell;
    pro: PlanComparisonCell;
    enterprise: PlanComparisonCell;
};

export type PricingComparisonGroup = {
    title: string;
    rows: PricingComparisonRow[];
};

export type PricingComparisonAddOnRow = {
    key: string;
    label: string;
    free: PlanComparisonCell;
    growth: PlanComparisonCell;
    pro: PlanComparisonCell;
    enterprise: PlanComparisonCell;
};
