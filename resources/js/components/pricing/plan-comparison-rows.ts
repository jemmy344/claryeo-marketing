export type PlanComparisonCell =
    | { kind: 'included' }
    | { kind: 'excluded' }
    | { kind: 'text'; value: string };

export type PlanComparisonRow = {
    label: string;
    free: PlanComparisonCell;
    growth: PlanComparisonCell;
    pro: PlanComparisonCell;
    enterprise: PlanComparisonCell;
};

export const PLAN_COMPARISON_ROWS: PlanComparisonRow[] = [
    {
        label: 'Monthly price',
        free: { kind: 'text', value: '₦0' },
        growth: { kind: 'text', value: '₦5,000' },
        pro: { kind: 'text', value: '₦12,500' },
        enterprise: { kind: 'text', value: 'Custom' },
    },
    {
        label: 'Invoicing limit',
        free: { kind: 'text', value: '10 / month' },
        growth: { kind: 'included' },
        pro: { kind: 'included' },
        enterprise: { kind: 'included' },
    },
    {
        label: 'Expense tracking',
        free: { kind: 'text', value: 'Manual entry' },
        growth: { kind: 'text', value: 'Manual entry' },
        pro: { kind: 'text', value: 'Real-time bank sync' },
        enterprise: { kind: 'text', value: 'Scaled with onboarding' },
    },
    {
        label: 'Automated reminders',
        free: { kind: 'excluded' },
        growth: { kind: 'included' },
        pro: { kind: 'included' },
        enterprise: { kind: 'included' },
    },
    {
        label: 'Custom branding',
        free: { kind: 'excluded' },
        growth: { kind: 'included' },
        pro: { kind: 'included' },
        enterprise: { kind: 'included' },
    },
    {
        label: 'Profit & loss summary',
        free: { kind: 'included' },
        growth: { kind: 'included' },
        pro: { kind: 'included' },
        enterprise: { kind: 'included' },
    },
    {
        label: 'Bank sync',
        free: { kind: 'excluded' },
        growth: { kind: 'text', value: 'Add-on' },
        pro: { kind: 'included' },
        enterprise: { kind: 'included' },
    },
    {
        label: 'AI tax assistant',
        free: { kind: 'excluded' },
        growth: { kind: 'excluded' },
        pro: { kind: 'included' },
        enterprise: { kind: 'included' },
    },
    {
        label: 'Multi-currency',
        free: { kind: 'excluded' },
        growth: { kind: 'excluded' },
        pro: { kind: 'included' },
        enterprise: { kind: 'included' },
    },
    {
        label: 'Reports & exports',
        free: { kind: 'text', value: 'Basic' },
        growth: { kind: 'text', value: 'Standard' },
        pro: { kind: 'text', value: 'Advanced & CSV' },
        enterprise: { kind: 'text', value: 'Advanced + priority' },
    },
    {
        label: 'Support',
        free: { kind: 'text', value: 'Standard' },
        growth: { kind: 'text', value: 'Standard' },
        pro: { kind: 'text', value: 'Standard' },
        enterprise: { kind: 'text', value: 'Priority' },
    },
];
