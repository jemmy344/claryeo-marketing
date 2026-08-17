import { ArrowUpRight } from 'lucide-react';
import type { FC } from 'react';

import AtmosphereCanvas from '@/components/landing/atmosphere-canvas';

type LandingFinalCtaProps = {
    getStartedUrl: string;
    waitlistUrl: string;
    waitlistMode: boolean;
};

const LandingFinalCta: FC<LandingFinalCtaProps> = ({
    getStartedUrl,
    waitlistUrl,
    waitlistMode,
}) => (
    <section id="cta" className="relative overflow-hidden bg-ink">
        <AtmosphereCanvas variant="dusk" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-transparent" />

        <div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center px-4 py-24 text-center md:py-32">
            <span className="t-eyebrow text-mist">
                Ready when you are
            </span>
            <h2 className="t-display-1 mt-4 max-w-2xl text-paper">
                <em>Close</em> the books.
                <br />
                Open your evening.
            </h2>
            <p className="t-lead mt-5 max-w-lg text-mist">
                Invoicing, expenses, and tax in one place, with bank sync and payment matching
                doing the admin, so you don't have to.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                    href={waitlistMode ? waitlistUrl : getStartedUrl}
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink shadow-lg transition-transform hover:scale-[1.02]"
                >
                    {waitlistMode ? 'Join the waitlist' : 'Get started free'}
                    <ArrowUpRight className="size-4" />
                </a>
                {!waitlistMode && (
                    <a
                        href={waitlistUrl}
                        className="rounded-full border border-paper/20 px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
                    >
                        Join the waitlist
                    </a>
                )}
            </div>
        </div>
    </section>
);

export default LandingFinalCta;
