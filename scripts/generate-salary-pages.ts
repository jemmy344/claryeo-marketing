/**
 * Generates resources/data/salary_pages.json: one entry per "tax on ₦X salary"
 * landing page, computed by the same engine the interactive calculator uses
 * (resources/js/lib/tax-calculator-v2), so pages and product can never disagree.
 *
 * Run after a tax-law change or when editing SALARY_POINTS:
 *     pnpm generate:salary-pages
 *
 * The output is COMMITTED to git. It is not generated during the Docker build:
 * the assets stage builds JS only, and its output would not reach the PHP stage.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
    calculateCalculatorResult,
    getDefaultTaxYearProfile,
} from '../resources/js/lib/tax-calculator-v2';
import type { CalculatorResult } from '../resources/js/lib/tax-calculator-v2/types';

/** Monthly gross salaries people actually search for, in Naira. */
const SALARY_POINTS = [
    70_000, 100_000, 150_000, 200_000, 250_000, 300_000, 400_000, 500_000,
    750_000, 1_000_000, 1_500_000, 2_000_000, 3_000_000, 5_000_000,
];

const naira = (value: number): string =>
    '₦' + Math.abs(Math.round(value)).toLocaleString('en-NG');

/** 500000 -> "500k-monthly", 1500000 -> "1-5m-monthly". */
function slugFor(monthly: number): string {
    if (monthly >= 1_000_000) {
        const millions = monthly / 1_000_000;
        return `${String(millions).replace('.', '-')}m-monthly`;
    }

    return `${monthly / 1_000}k-monthly`;
}

function label(monthly: number): string {
    return monthly >= 1_000_000
        ? `₦${String(monthly / 1_000_000).replace(/\.0$/, '')} million`
        : `₦${monthly / 1_000},000`;
}

function rowValue(result: CalculatorResult, key: string): number | null {
    for (const group of result.groups) {
        const row = group.rows.find((r) => r.key === key);
        if (row) return row.annualAmount;
    }
    return null;
}

/**
 * Per-band rows the engine emits as paye_taxable_band_N / paye_tax_band_N,
 * labelled from the profile's own band caps ("First ₦800,000", "Next ...").
 * Tax and deduction rows come back negative (display tone), hence Math.abs.
 */
function bandBreakdown(
    result: CalculatorResult,
): Array<{ scope: string; rate: string; taxable: number; tax: number }> {
    const bands: Array<{
        scope: string;
        rate: string;
        taxable: number;
        tax: number;
    }> = [];
    const profileBands = result.profile.paye.bands;

    for (const group of result.groups) {
        for (const row of group.rows) {
            const match = /^paye_taxable_band_(\d+)$/.exec(row.key);
            if (!match) continue;

            const index = Number(match[1]) - 1;
            const band = profileBands[index];
            if (!band) continue;

            bands.push({
                scope:
                    band.cap === null
                        ? `Above ${naira(
                              profileBands
                                  .slice(0, index)
                                  .reduce((sum, b) => sum + (b.cap ?? 0), 0),
                          )}`
                        : `${index === 0 ? 'First' : 'Next'} ${naira(band.cap)}`,
                rate: `${Math.round(band.rate * 100)}%`,
                taxable: Math.abs(row.annualAmount),
                tax: Math.abs(
                    rowValue(result, `paye_tax_band_${match[1]}`) ?? 0,
                ),
            });
        }
    }

    return bands;
}

const profile = getDefaultTaxYearProfile();

const pages = SALARY_POINTS.map((monthly) => {
    const result = calculateCalculatorResult({
        mode: 'employee_paye',
        payload: {
            profile,
            earnings: [
                {
                    id: 'gross',
                    label: 'Gross salary',
                    amount: monthly,
                    frequency: 'monthly',
                    taxable: true,
                },
            ],
            deductions: [],
        },
    });

    const { annualGrossIncome, annualTaxableIncome, annualTax, annualNetPay } =
        result.totals;
    const effectiveRate =
        annualGrossIncome > 0 ? (annualTax / annualGrossIncome) * 100 : 0;

    return {
        slug: slugFor(monthly),
        monthly_gross: monthly,
        monthly_gross_label: naira(monthly),
        label: label(monthly),
        annual_gross: annualGrossIncome,
        annual_gross_label: naira(annualGrossIncome),
        annual_taxable: annualTaxableIncome,
        annual_taxable_label: naira(annualTaxableIncome),
        annual_tax: annualTax,
        annual_tax_label: naira(annualTax),
        annual_net: annualNetPay,
        annual_net_label: naira(annualNetPay),
        monthly_tax: annualTax / 12,
        monthly_tax_label: naira(annualTax / 12),
        monthly_net: annualNetPay / 12,
        monthly_net_label: naira(annualNetPay / 12),
        effective_rate: Number(effectiveRate.toFixed(2)),
        effective_rate_label: `${effectiveRate.toFixed(1)}%`,
        rent_relief: Math.abs(rowValue(result, 'rent_relief_total') ?? 0),
        rent_relief_label: naira(rowValue(result, 'rent_relief_total') ?? 0),
        is_exempt: annualTax === 0,
        // Why the tax is zero. Below the annual minimum wage the whole salary is
        // exempt (employee-paye.ts skips the bands entirely); that threshold is
        // higher than the 0% band, so the page must not credit the band for it.
        is_minimum_wage_exempt:
            annualGrossIncome <= profile.paye.minimumWageAnnual,
        minimum_wage_annual_label: naira(profile.paye.minimumWageAnnual),
        zero_band_label: naira(profile.paye.bands[0]?.cap ?? 0),
        bands: bandBreakdown(result)
            .filter((band) => band.taxable > 0)
            .map((band) => ({
                scope: band.scope,
                rate: band.rate,
                taxable_label: naira(band.taxable),
                tax_label: naira(band.tax),
            })),
        tax_year: profile.key,
    };
});

// Adjacent-page links for internal linking (prev/next salary point).
const withNeighbours = pages.map((page, index) => ({
    ...page,
    prev: index > 0 ? pages[index - 1].slug : null,
    prev_label: index > 0 ? pages[index - 1].label : null,
    next: index < pages.length - 1 ? pages[index + 1].slug : null,
    next_label: index < pages.length - 1 ? pages[index + 1].label : null,
}));

const outputPath = resolve(
    import.meta.dirname,
    '../resources/data/salary_pages.json',
);

writeFileSync(outputPath, `${JSON.stringify(withNeighbours, null, 4)}\n`);

console.log(
    `Wrote ${withNeighbours.length} salary pages (tax year ${profile.key}) to ${outputPath}`,
);
