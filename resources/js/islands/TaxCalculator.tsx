import { useMemo, useState, type FormEvent } from 'react';
import { calculateCalculatorResult } from '@/lib/tax-calculator-v2';
import type { AmountFrequency, BusinessType, CalculatorResult, MoneyLineItem, RowTone } from '@/lib/tax-calculator-v2/types';
import { buildReportPayload } from '@/lib/tax-report';
import { submitJson } from '../lib/submit';

type Mode = 'employee_paye' | 'business_tax';

const ngn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 });
const money = (value: number): string => ngn.format(Math.round(Number.isFinite(value) ? value : 0));
const toNumber = (value: string): number => {
    const parsed = Number.parseFloat(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
};

const toneClass: Record<RowTone, string> = {
    default: 'text-foreground',
    muted: 'text-muted-foreground',
    highlight: 'text-primary',
    strong: 'font-semibold text-foreground',
};

function field(id: string, label: string, value: string, onChange: (v: string) => void, prefix = '₦') {
    return (
        <label htmlFor={id} className="block">
            <span className="text-sm font-medium text-foreground">{label}</span>
            <span className="mt-1 flex items-center rounded-lg border border-border bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30">
                <span className="px-3 text-muted-foreground">{prefix}</span>
                <input
                    id={id}
                    inputMode="decimal"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full rounded-r-lg bg-transparent py-2 pr-3 text-foreground outline-none"
                    placeholder="0"
                />
            </span>
        </label>
    );
}

export default function TaxCalculator({ storeUrl = '/tax-calculator/report' }: { storeUrl?: string }) {
    const [mode, setMode] = useState<Mode>('employee_paye');

    const [income, setIncome] = useState('500000');
    const [incomeFrequency, setIncomeFrequency] = useState<AmountFrequency>('monthly');
    const [rent, setRent] = useState('');

    const [businessType, setBusinessType] = useState<BusinessType>('sole_trader');
    const [revenue, setRevenue] = useState('20000000');
    const [expenses, setExpenses] = useState('8000000');
    const [vatCollected, setVatCollected] = useState('');
    const [vatInput, setVatInput] = useState('');

    const result: CalculatorResult = useMemo(() => {
        if (mode === 'employee_paye') {
            const earnings: MoneyLineItem[] = [
                { id: 'income', label: 'Gross income', amount: toNumber(income), frequency: incomeFrequency },
            ];

            return calculateCalculatorResult({
                mode: 'employee_paye',
                payload: { earnings, deductions: [], annualRentPaid: toNumber(rent) },
            });
        }

        const earnings: MoneyLineItem[] = [
            { id: 'revenue', label: 'Revenue', amount: toNumber(revenue), frequency: 'annually' },
        ];
        const deductions: MoneyLineItem[] = [
            { id: 'expenses', label: 'Allowable expenses', amount: toNumber(expenses), frequency: 'annually' },
        ];

        return calculateCalculatorResult({
            mode: 'business_tax',
            payload: {
                businessType,
                earnings,
                deductions,
                vatCollected: toNumber(vatCollected),
                vatInput: toNumber(vatInput),
            },
        });
    }, [mode, income, incomeFrequency, rent, businessType, revenue, expenses, vatCollected, vatInput]);

    const monthlyNet = result.totals.annualNetPay / 12;

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border p-6">
                <div className="mb-6 inline-flex rounded-full border border-border bg-card p-1 text-sm font-medium">
                    {([
                        ['employee_paye', 'Employee (PAYE)'],
                        ['business_tax', 'Business'],
                    ] as [Mode, string][]).map(([value, label]) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setMode(value)}
                            className={`rounded-full px-4 py-1.5 transition ${mode === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {mode === 'employee_paye' ? (
                    <div className="space-y-5">
                        <div>
                            {field('income', 'Gross income', income, setIncome)}
                            <div className="mt-2 inline-flex rounded-lg border border-border p-0.5 text-xs">
                                {(['monthly', 'annually'] as AmountFrequency[]).map((freq) => (
                                    <button
                                        key={freq}
                                        type="button"
                                        onClick={() => setIncomeFrequency(freq)}
                                        className={`rounded-md px-3 py-1 capitalize ${incomeFrequency === freq ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
                                    >
                                        {freq}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {field('rent', 'Annual rent paid (optional)', rent, setRent)}
                    </div>
                ) : (
                    <div className="space-y-5">
                        <label htmlFor="business_type" className="block">
                            <span className="text-sm font-medium text-foreground">Business type</span>
                            <select
                                id="business_type"
                                value={businessType}
                                onChange={(event) => setBusinessType(event.target.value as BusinessType)}
                                className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                            >
                                <option value="sole_trader">Sole trader</option>
                                <option value="small_business">Small business</option>
                                <option value="registered_company">Registered company</option>
                            </select>
                        </label>
                        {field('revenue', 'Annual revenue', revenue, setRevenue)}
                        {field('expenses', 'Allowable expenses', expenses, setExpenses)}
                        {field('vat_collected', 'VAT collected (optional)', vatCollected, setVatCollected)}
                        {field('vat_input', 'VAT paid on purchases (optional)', vatInput, setVatInput)}
                    </div>
                )}
            </div>

            <div className="rounded-2xl border border-border p-6">
                <p className="text-sm text-muted-foreground">{result.payRow.label}</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{money(result.payRow.annualAmount)}<span className="text-base font-normal text-muted-foreground"> / year</span></p>
                <p className="mt-1 text-sm text-muted-foreground">≈ {money(monthlyNet)} / month</p>

                <dl className="mt-6 space-y-5">
                    {result.groups.map((group) => (
                        <div key={group.key}>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.title}</p>
                            <div className="space-y-1.5">
                                {group.rows.map((row) => (
                                    <div key={row.key} className="flex items-baseline justify-between text-sm">
                                        <dt className={toneClass[row.tone ?? 'default']}>{row.label}</dt>
                                        <dd className={toneClass[row.tone ?? 'default']}>{money(row.annualAmount)}</dd>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </dl>

                <ReportForm result={result} businessType={mode === 'business_tax' ? businessType : null} storeUrl={storeUrl} />
            </div>
        </div>
    );
}

function ReportForm({ result, businessType, storeUrl }: { result: CalculatorResult; businessType: BusinessType | null; storeUrl: string }) {
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [sentTo, setSentTo] = useState<string | null>(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setProcessing(true);
        setErrors({});

        const payload = buildReportPayload(result, email, {
            consentContact: consent,
            consentMarketing: false,
            businessType,
        });

        const outcome = await submitJson(storeUrl, payload as unknown as Record<string, unknown>);
        setProcessing(false);

        if (outcome.ok) {
            const masked = (outcome.data?.data as { sent_to_masked?: string } | undefined)?.sent_to_masked;
            setSentTo(masked ?? email);
            return;
        }

        setErrors(outcome.errors);
    }

    if (sentTo) {
        return (
            <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Your estimate is on its way to {sentTo}. Check your inbox for the full breakdown.
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="mt-8 space-y-3 border-t border-border pt-6" noValidate>
            <p className="text-sm font-medium text-foreground">Email me this estimate</p>
            <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
            {errors.email?.[0] && <p className="text-sm text-destructive">{errors.email[0]}</p>}
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1" />
                <span>I agree to receive my estimate by email.</span>
            </label>
            {errors.consent_contact?.[0] && <p className="text-sm text-destructive">{errors.consent_contact[0]}</p>}
            <button
                type="submit"
                disabled={processing}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
                {processing ? 'Sending…' : 'Email my estimate'}
            </button>
        </form>
    );
}
