export type PlanKey = 'free' | 'growth' | 'pro' | 'enterprise';

export function isSelfServePlanKey(key: PlanKey): boolean {
    return key === 'growth' || key === 'pro';
}

export type PlanCatalogItem = {
    key: PlanKey;
    name: string;
    label: string;
    headline: string;
    summary: string;
    detail: string;
    priceLabel: string;
    badgeLabel: string | null;
    outcome: string;
    entitlementBullets: string[];
    nextSteps: string[];
    requiresContactSales: boolean;
    amount?: number | null;
    currency?: string | null;
    monthlyPriceLabel?: string;
    annualPriceLabel?: string;
    monthlyAmount?: number | null;
    annualAmount?: number | null;
};
