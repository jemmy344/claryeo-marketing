import { useEffect, useRef } from 'react';
import type { FC } from 'react';

import { onScrollProgress, prefersReducedMotion } from '@/lib/motion';

type LedgerRailProps = {
    /** Ledger date for this entry, e.g. "14 Aug". */
    date: string;
    /** The entry's reference -- a real one from the story, not a step number. */
    reference: string;
};

/**
 * The spine that ties the spotlight sections into one run: a ruled column
 * carrying the date and reference of the money-flow moment each section
 * shows. It's a sequence device because the content genuinely is a sequence
 * -- a payment lands, matches an invoice, then closes into a report.
 *
 * The rule inks in as the section passes, so the run reads as a ledger being
 * written rather than three sections stacked.
 */
const LedgerRail: FC<LedgerRailProps> = ({ date, reference }) => {
    const railRef = useRef<HTMLDivElement>(null);
    const inkRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const rail = railRef.current;
        const ink = inkRef.current;
        if (!rail || !ink) return;

        if (prefersReducedMotion()) {
            ink.style.transform = 'scaleY(1)';
            return;
        }

        return onScrollProgress(rail, (p) => {
            // Ink between 15% and 70% of the pass so the rule is complete
            // while the section is still centred, not as it leaves.
            const drawn = Math.min(Math.max((p - 0.15) / 0.55, 0), 1);
            ink.style.transform = `scaleY(${drawn.toFixed(4)})`;
        });
    }, []);

    return (
        <div ref={railRef} className="relative md:h-full">
            <p className="t-label text-mist md:hidden">
                {date} · {reference}
            </p>

            <div className="absolute inset-0 hidden md:block" aria-hidden="true">
                <span className="absolute inset-y-0 left-0 w-px bg-ink-border" />
                <span
                    ref={inkRef}
                    className="absolute inset-y-0 left-0 w-px origin-top bg-violet-bright/70"
                    style={{ transform: 'scaleY(0)' }}
                />
                <span className="absolute top-1.5 -left-[2.5px] size-[6px] rounded-full bg-violet-bright" />
                <span className="t-eyebrow absolute top-0 left-4 whitespace-nowrap text-paper">
                    {date}
                </span>
                <span className="absolute top-5 left-4 t-mono text-[10px] whitespace-nowrap text-mist">
                    {reference}
                </span>
            </div>
        </div>
    );
};

export default LedgerRail;
