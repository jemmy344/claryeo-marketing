import type { FC } from 'react';
import { useState } from 'react';

import PlanComparisonMatrix from '@/components/pricing/plan-comparison-matrix';
import PricingPlansShowcase from '@/components/pricing/pricing-plans-showcase';
import type { BillingInterval } from '@/components/pricing/pricing-utils';
import type { PlanCatalogItem } from '@/types/plan-catalog';
import type {
    PricingComparisonAddOnRow,
    PricingComparisonGroup,
} from '@/types/pricing-comparison-addons';

type PricingPageProps = {
    plans?: PlanCatalogItem[];
    comparisonMatrix?: PricingComparisonGroup[];
    comparisonAddOns?: PricingComparisonAddOnRow[];
    getStartedUrl?: string;
    contactUrl?: string;
};

const PricingPage: FC<PricingPageProps> = ({
    plans = [],
    comparisonMatrix = [],
    comparisonAddOns = [],
    getStartedUrl = '/get-started',
    contactUrl = '/contact',
}) => {
    const [billing, setBilling] = useState<BillingInterval>('annual');

    if (plans.length === 0) {
        return (
            <p className="rounded-xl border border-border bg-muted/40 p-6 text-center text-muted-foreground">
                Pricing is temporarily unavailable. Please check back shortly.
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <section className="bg-background py-12 transition-colors duration-300 md:py-16">
                <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
                    <p className="t-eyebrow text-primary">Pricing</p>
                    <h1 className="t-display-1 mt-3 text-foreground">
                        Simple and transparent pricing for every business size
                    </h1>
                    <p className="t-lead mt-4 text-muted-foreground">
                        Switch between monthly and annual billing to compare
                        Free, Growth, Pro, and Enterprise. Every plan uses
                        Claryeo's current theme and checkout paths.
                    </p>
                </div>
            </section>

            <PricingPlansShowcase
                plans={plans}
                billing={billing}
                onBillingChange={setBilling}
                getStartedUrl={getStartedUrl}
                contactUrl={contactUrl}
                layout={{
                    sectionClassName:
                        'border-b border-border pb-14 transition-colors duration-300 md:pb-16',
                    heading: '',
                    subheading: '',
                }}
            />

            <section className="py-14 transition-colors duration-300 md:py-20">
                <div className="mx-auto max-w-[1180px] px-4 md:px-0">
                    <h2 className="text-center text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                        Detailed comparison
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
                        Every column reflects the same catalog we use in
                        checkout, so what you see here matches what you get in
                        product.
                    </p>
                    <div className="mt-10">
                        <PlanComparisonMatrix
                            plans={plans}
                            billing={billing}
                            onBillingChange={setBilling}
                            groups={comparisonMatrix}
                            addOns={comparisonAddOns}
                            getStartedUrl={getStartedUrl}
                            contactUrl={contactUrl}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;
