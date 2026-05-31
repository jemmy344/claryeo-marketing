import type { FC } from 'react';

import PricingPlansShowcase from '@/components/pricing/pricing-plans-showcase';
import type { PlanCatalogItem } from '@/types/plan-catalog';

type LandingPricingProps = {
    plans: PlanCatalogItem[];
};

const LandingPricing: FC<LandingPricingProps> = ({ plans }) => (
    <PricingPlansShowcase
        plans={plans}
        getStartedUrl="/get-started"
        contactUrl="/contact"
        layout={{
            sectionId: 'pricing',
            compareHref: '/pricing',
            compareLabel: 'Compare all features in detail',
        }}
    />
);

export default LandingPricing;
