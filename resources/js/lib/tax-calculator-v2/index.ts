import { calculateBusinessTax } from '@/lib/tax-calculator-v2/business-tax';
import { calculateEmployeePaye } from '@/lib/tax-calculator-v2/employee-paye';
import { getDefaultTaxYearProfile } from '@/lib/tax-calculator-v2/profiles';
import {
    ANNUAL_MULTIPLIERS,
    SUMMARY_PERIODS,
    type AmountFrequency,
    type BusinessTaxInput,
    type CalculatorResult,
    type EmployeePayeInput,
    type MoneyLineItem,
    type PeriodizedAmount,
    type TaxYearProfile,
} from '@/lib/tax-calculator-v2/types';

function sanitizeAmount(value: number): number {
    if (!Number.isFinite(value) || value < 0) {
        return 0;
    }

    return value;
}

export function annualizeAmount(
    amount: number,
    frequency: AmountFrequency,
): number {
    return sanitizeAmount(amount) * ANNUAL_MULTIPLIERS[frequency];
}

export function annualizeLineItem(item: MoneyLineItem): number {
    return annualizeAmount(item.amount, item.frequency);
}

export function periodizeAnnualAmount(annualAmount: number): PeriodizedAmount {
    const sanitizedAnnualAmount = Number.isFinite(annualAmount)
        ? annualAmount
        : 0;

    return {
        weekly: sanitizedAnnualAmount / 52,
        fortnightly: sanitizedAnnualAmount / 26,
        monthly: sanitizedAnnualAmount / 12,
        annually: sanitizedAnnualAmount,
    };
}

export function toPeriodAmount(
    annualAmount: number,
    frequency: AmountFrequency,
): number {
    return periodizeAnnualAmount(annualAmount)[frequency];
}

export function calculateCalculatorResult(
    input:
        | {
              mode: 'employee_paye';
              payload: Omit<EmployeePayeInput, 'profile'> & {
                  profile?: TaxYearProfile;
              };
          }
        | {
              mode: 'business_tax';
              payload: Omit<BusinessTaxInput, 'profile'> & {
                  profile?: TaxYearProfile;
              };
          },
): CalculatorResult {
    const profile = input.payload.profile ?? getDefaultTaxYearProfile();

    if (input.mode === 'employee_paye') {
        return calculateEmployeePaye({
            profile,
            earnings: input.payload.earnings,
            deductions: input.payload.deductions,
            annualRentPaid: sanitizeAmount(input.payload.annualRentPaid ?? 0),
        });
    }

    return calculateBusinessTax({
        profile,
        businessType: input.payload.businessType,
        earnings: input.payload.earnings,
        deductions: input.payload.deductions,
        vatCollected: sanitizeAmount(input.payload.vatCollected),
        vatInput: sanitizeAmount(input.payload.vatInput),
        fixedAssets:
            input.payload.fixedAssets === undefined
                ? undefined
                : sanitizeAmount(input.payload.fixedAssets),
        isProfessionalService: input.payload.isProfessionalService === true,
        isNonResidentCompany: input.payload.isNonResidentCompany === true,
        assessableProfit:
            input.payload.assessableProfit === undefined
                ? undefined
                : sanitizeAmount(input.payload.assessableProfit),
    });
}

export * from '@/lib/tax-calculator-v2/profiles';
export * from '@/lib/tax-calculator-v2/types';
export { calculateBusinessTax, calculateEmployeePaye, SUMMARY_PERIODS };
