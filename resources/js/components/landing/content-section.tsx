import { ChevronRight } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';

type ContentSectionProps = {
    waitlistUrl: string;
    getStartedUrl?: string;
    waitlistMode?: boolean;
};

const ContentSection: FC<ContentSectionProps> = ({
    waitlistUrl,
    getStartedUrl = '/get-started',
    waitlistMode = false,
}) => (
    <section className="py-16 transition-colors duration-300 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                <h2 className="t-display-2 text-foreground">
                    Invoicing, expenses, tax and payment matching — all from one login.
                </h2>
                <div className="space-y-6">
                    <p className="text-muted-foreground">
                        Claryeo is built for freelancers and small businesses.
                        Your bank transactions sync automatically—no manual
                        entry or statement uploads. Realtime account tracking,
                        automatic payment matching, and tax-ready summaries
                        in one place. Less admin, more focus on your business.
                        Rolling out in Nigeria first.
                    </p>
                    <p className="text-muted-foreground">
                        {waitlistMode ? (
                            <>
                                <span className="font-bold text-foreground">
                                    Join the waitlist
                                </span>{' '}
                                for early access and to help shape the product.
                                No credit card required.
                            </>
                        ) : (
                            <>
                                <span className="font-bold text-foreground">
                                    Get started free
                                </span>{' '}
                                in minutes. No credit card required.
                            </>
                        )}
                    </p>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="gap-1 pr-1.5"
                        asChild
                    >
                        <a href={waitlistMode ? waitlistUrl : getStartedUrl}>
                            <span>
                                {waitlistMode ? 'Join waitlist' : 'Get started free'}
                            </span>
                            <ChevronRight className="size-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

export default ContentSection;
