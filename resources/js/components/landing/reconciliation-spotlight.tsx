import { useEffect, useRef } from 'react';
import type { FC } from 'react';

import LedgerRail from '@/components/landing/ledger-rail';
import QueueCard, { type BankCredit } from '@/components/dashboard/queue-card';
import { gsap, prefersReducedMotion, ScrollTrigger, setupMotion } from '@/lib/motion';

const CREDIT: BankCredit = {
    id: 'demo-credit-1',
    amount: 45_000,
    remaining: 45_000,
    bank: 'GTBank',
    receivedAt: '2026-08-14',
    description: 'PAY-9284-INV014',
    suggestion: {
        confidence: 'likely',
        invoiceNumber: 'INV-014',
        clientName: 'Adaeze Okonkwo',
        amountDue: 45_000,
        reasons: ['Amount matches', 'Reference matches', 'Same week'],
    },
};

const noop = (): void => {};

/**
 * The first entry in the ledger run: a credit lands and resolves into a
 * match. This is the actual reconciliation queue card from the app
 * (components/dashboard/queue-card.tsx), fed a static demo credit -- not a
 * lookalike -- so it's pixel-identical to what a signed-in user sees.
 *
 * It plays once on entry rather than tracking scroll, and is built lazily
 * inside onEnter -- by the time the section has scrolled into view, layout
 * is settled, so there's nothing stale to measure.
 */
const ReconciliationSpotlight: FC = () => {
    const wrapperRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion() || !wrapperRef.current) return;

        setupMotion();
        gsap.set(cardRef.current, { opacity: 0, y: 16 });

        const trigger = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: 'top 75%',
            once: true,
            onEnter: () => {
                gsap.to(cardRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
            },
        });

        return () => trigger.kill();
    }, []);

    return (
        <section
            ref={wrapperRef}
            className="border-t border-ink-border bg-ink py-16 transition-colors duration-300 md:py-28"
        >
            <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 md:grid-cols-[9rem_1fr_1.1fr] md:items-start md:gap-12 md:px-0">
                <LedgerRail date="14 Aug" reference="PAY-9284" />

                <div>
                    <span className="t-label text-mist">
                        From your dashboard
                    </span>
                    <h2 className="t-display-2 mt-3 text-paper">
                        <em>Match</em> payments
                        <br />
                        to invoices
                    </h2>
                    <p className="t-body mt-5 max-w-sm text-mist">
                        Every credit that lands is checked against your open invoices by amount,
                        reference and timing. You see the evidence and confirm — nothing posts to
                        your books until you say so.
                    </p>
                </div>

                {/* `inert`: this is a demo of the real queue card, so its
                    buttons are wired to no-ops. Left interactive they read as
                    a broken product -- clicking "Yes, match it" would do
                    nothing at all. */}
                <div ref={cardRef} inert>
                    <QueueCard
                        credit={CREDIT}
                        onOpenMatchScreen={noop}
                        onSetAside={noop}
                        onAcceptSuggestion={noop}
                    />
                </div>
            </div>
        </section>
    );
};

export default ReconciliationSpotlight;
