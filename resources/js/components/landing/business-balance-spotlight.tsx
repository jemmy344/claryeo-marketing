import { useEffect, useRef } from 'react';
import type { FC } from 'react';

import BusinessBalanceCard from '@/components/dashboard/business-balance-card';
import { gsap, prefersReducedMotion, ScrollTrigger, setupMotion } from '@/lib/motion';
import { formatCurrency } from '@/lib/utils';

const STATS = [
    { label: '24H Change', value: `+${formatCurrency(120_000, 'NGN', { compact: true })}`, isPositive: true },
    { label: 'Highest Balance', value: formatCurrency(5_240_000, 'NGN', { compact: true }) },
    { label: 'Business Age', value: '8 months' },
    { label: 'Best Month', value: 'August' },
    { label: 'Worst Month', value: 'April' },
];

/**
 * The actual business-balance card from the dashboard
 * (components/dashboard/business-balance-card.tsx) -- same balance ring,
 * same eye-toggle to hide figures, same stat row. Fades in once on scroll.
 */
const BusinessBalanceSpotlight: FC = () => {
    const wrapperRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion() || !wrapperRef.current) return;

        setupMotion();
        gsap.set(cardRef.current, { opacity: 0, y: 16 });

        const trigger = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: 'top 78%',
            once: true,
            onEnter: () => {
                gsap.to(cardRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
            },
        });

        return () => trigger.kill();
    }, []);

    return (
        <section ref={wrapperRef} className="bg-ink py-16 transition-colors duration-300 md:py-24">
            <div className="mx-auto w-full max-w-[1180px] px-4 md:px-0">
                <div className="mx-auto max-w-xl text-center">
                    <span className="t-eyebrow text-mist">
                        From your dashboard
                    </span>
                    <h2 className="t-display-2 mt-3 text-paper">
                        <em>See</em> exactly where your business stands
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-mist">
                        The same balance card that greets you every time you log in: revenue,
                        expenses and net, at a glance.
                    </p>
                </div>
                <div ref={cardRef} className="mt-10">
                    <BusinessBalanceCard
                        balance={formatCurrency(4_082_650, 'NGN')}
                        stats={STATS}
                    />
                </div>
            </div>
        </section>
    );
};

export default BusinessBalanceSpotlight;
