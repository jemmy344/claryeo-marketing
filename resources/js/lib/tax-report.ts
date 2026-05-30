import type { BusinessType, CalculatorResult } from '@/lib/tax-calculator-v2/types';

export interface ReportPayload {
    document_type: 'tax_calculator_estimate';
    email: string;
    consent_contact: boolean;
    consent_marketing: boolean;
    payload: {
        calculator_mode: string;
        tax_year_key: string;
        business_type: BusinessType | null;
        profile: { label: string; rule_snapshot_date: string; effective_from: string };
        totals: {
            annual_gross_income: number;
            annual_deductions: number;
            annual_taxable_income: number;
            annual_tax: number;
            annual_net_pay: number;
        };
        pay_row: { label: string; annual_amount: number };
        groups: Array<{
            key: string;
            title: string;
            rows: Array<{ key: string; label: string; detail: string | null; annual_amount: number; tone: string | null }>;
        }>;
        disclaimer: string | null;
    };
}

/**
 * Map a locally-computed CalculatorResult to the payload shape the main app's
 * internal tax-report API validates. The estimate is computed client-side; the
 * API only emails + stores the lead.
 */
export function buildReportPayload(
    result: CalculatorResult,
    email: string,
    options: { consentContact: boolean; consentMarketing: boolean; businessType?: BusinessType | null; disclaimer?: string | null },
): ReportPayload {
    return {
        document_type: 'tax_calculator_estimate',
        email,
        consent_contact: options.consentContact,
        consent_marketing: options.consentMarketing,
        payload: {
            calculator_mode: result.mode,
            tax_year_key: result.profile.key,
            business_type: options.businessType ?? null,
            profile: {
                label: result.profile.label,
                rule_snapshot_date: result.profile.ruleSnapshotDate,
                effective_from: result.profile.effectiveFrom,
            },
            totals: {
                annual_gross_income: result.totals.annualGrossIncome,
                annual_deductions: result.totals.annualDeductions,
                annual_taxable_income: result.totals.annualTaxableIncome,
                annual_tax: result.totals.annualTax,
                annual_net_pay: result.totals.annualNetPay,
            },
            pay_row: { label: result.payRow.label, annual_amount: result.payRow.annualAmount },
            groups: result.groups.map((group) => ({
                key: group.key,
                title: group.title,
                rows: group.rows.map((row) => ({
                    key: row.key,
                    label: row.label,
                    detail: row.detail ?? null,
                    annual_amount: row.annualAmount,
                    tone: row.tone ?? null,
                })),
            })),
            disclaimer: options.disclaimer ?? null,
        },
    };
}
