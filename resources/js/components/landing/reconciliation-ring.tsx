import { animate, createTimeline, stagger } from 'animejs';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';

import { formatCurrency } from '@/lib/utils';
import { prefersReducedMotion, ScrollTrigger, setupMotion } from '@/lib/motion';

const TXN_COUNT = 10;
const TARGET_BALANCE = 4_082_650;
const RING_RADIUS = 128;

const dots = Array.from({ length: TXN_COUNT }, (_, i) => {
    const angle = (i / TXN_COUNT) * Math.PI * 2 - Math.PI / 2;
    return {
        id: i,
        angle,
        x: Math.cos(angle) * RING_RADIUS,
        y: Math.sin(angle) * RING_RADIUS,
    };
});

/**
 * The signature moment: loose bank transactions orbit in and converge into
 * one reconciled balance -- Claryeo's core promise made literal. Plays once
 * on scroll-into-view; static (final state) for reduced-motion users.
 */
const ReconciliationRing: FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
    const [balance, setBalance] = useState(prefersReducedMotion() ? TARGET_BALANCE : 0);
    const [settled, setSettled] = useState(prefersReducedMotion());
    const played = useRef(false);

    useEffect(() => {
        if (prefersReducedMotion() || !sectionRef.current) return;

        setupMotion();
        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
            onEnter: () => {
                if (played.current) return;
                played.current = true;

                const counter = { value: 0 };
                const tl = createTimeline({ defaults: { ease: 'outExpo' } });

                tl.add(
                    dotRefs.current.filter((el): el is SVGCircleElement => el !== null),
                    {
                        cx: 0,
                        cy: 0,
                        opacity: [1, 0.35],
                        duration: 900,
                        delay: stagger(60),
                    },
                    0,
                ).add(
                    counter,
                    {
                        value: TARGET_BALANCE,
                        duration: 1100,
                        ease: 'outQuint',
                        onUpdate: () => setBalance(Math.round(counter.value)),
                        onComplete: () => setSettled(true),
                    },
                    200,
                );

                if (!glowRef.current) return;
                animate(glowRef.current, {
                    scale: [0.9, 1.08, 1],
                    opacity: [0.5, 1, 0.85],
                    duration: 1400,
                    ease: 'outElastic(1, .6)',
                });
            },
        });

        return () => {
            trigger.kill();
        };
    }, []);

    return (
        <div ref={sectionRef} className="flex flex-col items-center">
            <div className="relative flex size-72 items-center justify-center md:size-80">
                <div
                    ref={glowRef}
                    className="absolute inset-0 rounded-full opacity-85"
                    style={{
                        background:
                            'radial-gradient(closest-side, color-mix(in oklab, var(--color-violet-bright) 55%, transparent), transparent 72%)',
                        filter: 'blur(2px)',
                    }}
                />
                <svg
                    viewBox="-140 -140 280 280"
                    className="relative size-full overflow-visible"
                    aria-hidden="true"
                >
                    <circle
                        r={RING_RADIUS}
                        fill="none"
                        stroke="var(--color-ink-border)"
                        strokeWidth={1}
                        strokeDasharray="2 8"
                    />
                    {dots.map((dot, i) => (
                        <circle
                            key={dot.id}
                            ref={(el) => {
                                dotRefs.current[i] = el;
                            }}
                            cx={dot.x}
                            cy={dot.y}
                            r={5}
                            fill={i % 2 === 0 ? 'var(--color-dawn)' : 'var(--color-violet-bright)'}
                        />
                    ))}
                    <circle r={38} fill="var(--color-ink)" stroke="var(--color-ink-border)" />
                </svg>
                <div className="pointer-events-none absolute flex flex-col items-center text-center">
                    <span className="t-label text-mist">
                        Reconciled
                    </span>
                    <span
                        className={`t-figure-display mt-1 text-paper transition-opacity duration-300 ${settled ? 'opacity-100' : 'opacity-90'}`}
                    >
                        {formatCurrency(balance, 'NGN', { compact: true })}
                    </span>
                </div>
            </div>
            <p className="t-body-sm mt-8 max-w-sm text-center text-mist">
                Every bank transaction lands here automatically and settles into one number you
                can trust -- no statements, no spreadsheets.
            </p>
        </div>
    );
};

export default ReconciliationRing;
