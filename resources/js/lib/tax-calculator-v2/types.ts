export type CalculatorMode = 'employee_paye' | 'business_tax';

export type BusinessType =
    | 'sole_trader'
    | 'small_business'
    | 'registered_company';

export type AmountFrequency = 'weekly' | 'fortnightly' | 'monthly' | 'annually';

export type EntryMode = 'single' | 'multiple';

export type RowTone = 'default' | 'muted' | 'highlight' | 'strong';

export interface MoneyLineItem {
    id: string;
    label: string;
    amount: number;
    frequency: AmountFrequency;
    taxable?: boolean;
    deductible?: boolean;
    preset?: string;
}

export interface TaxBand {
    cap: number | null;
    rate: number;
}

export interface PayeProfile {
    // Configurable threshold from extant National Minimum Wage law.
    minimumWageAnnual: number;
    rentRelief: {
        rate: number;
        annualCap: number;
    };
    bands: TaxBand[];
}

export interface CitProfile {
    smallCompanyTurnoverThreshold: number;
    smallCompanyAssetThreshold: number;
    standardRate: number;
    developmentLevyRate: number;
}

export interface BusinessTaxProfile {
    cit: CitProfile;
    vatRate: number;
}

export interface TaxYearProfile {
    key: string;
    label: string;
    effectiveFrom: string;
    ruleSnapshotDate: string;
    paye: PayeProfile;
    business: BusinessTaxProfile;
}

export interface EmployeePayeInput {
    profile: TaxYearProfile;
    earnings: MoneyLineItem[];
    deductions: MoneyLineItem[];
    annualRentPaid?: number;
}

export interface BusinessTaxInput {
    profile: TaxYearProfile;
    businessType: BusinessType;
    earnings: MoneyLineItem[];
    deductions: MoneyLineItem[];
    vatCollected: number;
    vatInput: number;
    fixedAssets?: number;
    isProfessionalService?: boolean;
    isNonResidentCompany?: boolean;
    assessableProfit?: number;
}

export interface SummaryRow {
    key: string;
    label: string;
    annualAmount: number;
    tone?: RowTone;
    detail?: string;
}

export interface SummaryGroup {
    key: string;
    title: string;
    rows: SummaryRow[];
    defaultOpen?: boolean;
}

export interface PeriodizedAmount {
    weekly: number;
    fortnightly: number;
    monthly: number;
    annually: number;
}

export interface CalculatorTotals {
    annualGrossIncome: number;
    annualDeductions: number;
    annualTaxableIncome: number;
    annualTax: number;
    annualNetPay: number;
}

export interface CalculatorResult {
    mode: CalculatorMode;
    profile: TaxYearProfile;
    payRow: SummaryRow;
    groups: SummaryGroup[];
    totals: CalculatorTotals;
    meta: Record<string, number | string | null>;
}

export type SummaryPeriod = {
    key: AmountFrequency;
    label: string;
    annualDivisor: number;
};

export const SUMMARY_PERIODS: SummaryPeriod[] = [
    { key: 'weekly', label: 'Weekly', annualDivisor: 52 },
    { key: 'fortnightly', label: 'Fortnightly', annualDivisor: 26 },
    { key: 'monthly', label: 'Monthly', annualDivisor: 12 },
    { key: 'annually', label: 'Annually', annualDivisor: 1 },
];

export const ANNUAL_MULTIPLIERS: Record<AmountFrequency, number> = {
    weekly: 52,
    fortnightly: 26,
    monthly: 12,
    annually: 1,
};
