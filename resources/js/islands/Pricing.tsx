import { useMemo, useState } from 'react';

type BillingInterval = 'monthly' | 'annual';

interface Plan {
    key: string;
    name: string;
    headline?: string;
    summary?: string;
    priceLabel?: string;
    monthlyPriceLabel?: string;
    annualPriceLabel?: string;
    badgeLabel?: string | null;
    entitlementBullets?: string[];
    requiresContactSales?: boolean;
}

interface PricingProps {
    plans?: Plan[];
    getStartedUrl?: string;
    contactUrl?: string;
}

function priceFor(plan: Plan, interval: BillingInterval): string {
    if (interval === 'annual' && plan.annualPriceLabel) {
        return plan.annualPriceLabel;
    }

    if (interval === 'monthly' && plan.monthlyPriceLabel) {
        return plan.monthlyPriceLabel;
    }

    return plan.priceLabel ?? '';
}

function ctaFor(plan: Plan, interval: BillingInterval, getStartedUrl: string, contactUrl: string): { label: string; href: string } {
    if (plan.requiresContactSales) {
        return { label: 'Contact sales', href: `${contactUrl}?plan=${encodeURIComponent(plan.key)}` };
    }

    const params = new URLSearchParams({ plan: plan.key });
    if (plan.monthlyPriceLabel || plan.annualPriceLabel) {
        params.set('billing_interval', interval);
    }

    return { label: 'Get started', href: `${getStartedUrl}?${params.toString()}` };
}

export default function Pricing({ plans = [], getStartedUrl = '/get-started', contactUrl = '/contact' }: PricingProps) {
    const [interval, setInterval] = useState<BillingInterval>('monthly');

    const hasIntervalPricing = useMemo(
        () => plans.some((plan) => plan.monthlyPriceLabel || plan.annualPriceLabel),
        [plans],
    );

    if (plans.length === 0) {
        return (
            <p className="rounded-xl border border-border bg-muted/40 p-6 text-center text-muted-foreground">
                Pricing is temporarily unavailable. Please check back shortly.
            </p>
        );
    }

    return (
        <div>
            {hasIntervalPricing && (
                <div className="mb-10 flex justify-center">
                    <div className="inline-flex rounded-full border border-border bg-card p-1 text-sm font-medium">
                        {(['monthly', 'annual'] as BillingInterval[]).map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setInterval(option)}
                                className={`rounded-full px-5 py-1.5 capitalize transition ${
                                    interval === option ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {option}
                                {option === 'annual' && <span className="ml-1 text-xs opacity-80">save</span>}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {plans.map((plan) => {
                    const cta = ctaFor(plan, interval, getStartedUrl, contactUrl);
                    const featured = Boolean(plan.badgeLabel);

                    return (
                        <div
                            key={plan.key}
                            className={`flex flex-col rounded-2xl border p-6 ${
                                featured ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                                {plan.badgeLabel && (
                                    <span className="rounded-full bg-primary-surface px-2.5 py-0.5 text-xs font-medium text-primary-surface-foreground">
                                        {plan.badgeLabel}
                                    </span>
                                )}
                            </div>

                            {plan.headline && <p className="mt-1 text-sm text-muted-foreground">{plan.headline}</p>}

                            <p className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{priceFor(plan, interval)}</p>

                            <a
                                href={cta.href}
                                className={`mt-5 rounded-lg px-4 py-2.5 text-center text-sm font-medium transition ${
                                    featured
                                        ? 'bg-primary text-primary-foreground hover:opacity-90'
                                        : 'border border-border text-foreground hover:bg-muted'
                                }`}
                            >
                                {cta.label}
                            </a>

                            {plan.entitlementBullets && plan.entitlementBullets.length > 0 && (
                                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                                    {plan.entitlementBullets.map((bullet, index) => (
                                        <li key={index} className="flex gap-2">
                                            <span aria-hidden className="mt-0.5 text-primary">&#10003;</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
