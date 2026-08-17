import { ArrowUpRight } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';

type GuideCtaProps = {
    heading?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
};

const GuideCta: FC<GuideCtaProps> = ({
    heading = 'Try the free Nigerian tax calculator',
    description = 'Calculate your PAYE or business tax instantly — no signup required.',
    buttonText = 'Open tax calculator',
    buttonHref = '/tax-calculator',
}) => (
    <div className="my-10 rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8">
        <h3 className="t-ui-title-lg text-foreground">{heading}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4">
            <Button
                asChild
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
                <a href={buttonHref}>
                    {buttonText}
                    <ArrowUpRight className="size-4" />
                </a>
            </Button>
        </div>
    </div>
);

export default GuideCta;
