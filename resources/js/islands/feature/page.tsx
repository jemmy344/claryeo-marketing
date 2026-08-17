import {
    AlertTriangle,
    ArrowUpRight,
    Check,
    CheckCircle2,
    Clock,
    Landmark,
    Lightbulb,
    Lock,
    Sparkles,
} from 'lucide-react';
import { useEffect, useLayoutEffect, useRef } from 'react';
import type { FC, RefObject } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import DashboardIncomeExpenseChart from '@/components/dashboard/dashboard-income-expense-chart';
import InvoiceOverviewCard from '@/components/dashboard/invoice-overview-card';
import { gsap, prefersReducedMotion, ScrollTrigger, setupMotion } from '@/lib/motion';
import { formatCurrency } from '@/lib/utils';

const INCOME_EXPENSE_DATA = [
    { month: '2026-03', income: 1_120_000, expenses: 640_000 },
    { month: '2026-04', income: 980_000, expenses: 710_000 },
    { month: '2026-05', income: 1_340_000, expenses: 690_000 },
    { month: '2026-06', income: 1_260_000, expenses: 820_000 },
    { month: '2026-07', income: 1_580_000, expenses: 760_000 },
    { month: '2026-08', income: 1_720_000, expenses: 890_000 },
];

type Cta = { label: string; href: string };
type Highlight = { value: string; label: string };
type Section = { heading: string; body: string; bullets: string[] };
type Faq = { question: string; answer: string };

type Feature = {
    slug: string;
    title: string;
    eyebrow: string;
    badge?: string;
    tagline: string;
    heroParagraph: string;
    media?: { src: string; alt: string };
    highlights: Highlight[];
    sections: Section[];
    faqs: Faq[];
};

type FeaturePageProps = {
    feature?: Feature;
    cta?: Cta;
    waitlistMode?: boolean;
};

/** A single character-by-character reveal, tied to scroll-into-view. */
function useTypewriter(full: string) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (prefersReducedMotion()) {
            el.textContent = full;
            return;
        }

        setupMotion();
        el.textContent = '';
        const chars = full.split('');

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                const counter = { i: 0 };
                gsap.to(counter, {
                    i: chars.length,
                    duration: chars.length * 0.026,
                    ease: 'none',
                    onUpdate: () => {
                        const count = Math.round(counter.i);
                        el.textContent =
                            chars.slice(0, count).join('') + (count < chars.length ? '▌' : '');
                    },
                });
            },
        });

        return () => trigger.kill();
    }, [full]);

    return ref;
}

/** A live-feeling exchange with the AI assistant, typed in on scroll. */
function AiAssistantPreview({
    eyebrow = 'Ask your books',
    question = 'How much did I spend on fuel last quarter?',
    answer = '₦184,500 across 12 transactions, 18% more than last quarter.',
}: {
    eyebrow?: string;
    question?: string;
    answer?: string;
}) {
    const answerRef = useTypewriter(answer);

    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <span className="t-label text-muted-foreground">
                {eyebrow}
            </span>
            <div className="mt-4 flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-muted px-4 py-2.5 text-sm text-foreground">
                    {question}
                </p>
            </div>
            <div className="mt-3 flex items-start gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Sparkles className="size-3.5" />
                </span>
                <p className="min-h-16 max-w-[85%] rounded-2xl rounded-tl-sm bg-primary/10 px-4 py-2.5 text-sm text-foreground">
                    <span ref={answerRef} />
                </p>
            </div>
        </div>
    );
}

function Row({ label, value, tone }: { label: string; value: string; tone?: 'positive' | 'negative' | 'pending' }) {
    const Icon = tone === 'positive' ? CheckCircle2 : tone === 'negative' ? AlertTriangle : Clock;
    const color = tone === 'positive' ? 'text-positive' : tone === 'negative' ? 'text-negative' : 'text-pending';

    return (
        <div className="flex items-center justify-between border-b border-border py-2.5 last:border-b-0">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
                {tone && <Icon className={`size-3.5 ${color}`} />}
                {label}
            </span>
            <span className="t-mono text-sm text-foreground">{value}</span>
        </div>
    );
}

/** The real invoice-overview card from the dashboard, not a lookalike. */
function InvoicingPreview() {
    return (
        <InvoiceOverviewCard invoiceCount={23} paidCount={18} pendingCount={4} overdueCount={1} outstanding={0} />
    );
}

/** The real income & expense chart from the dashboard, not a lookalike. */
function TaxReportsHeroPreview() {
    return <DashboardIncomeExpenseChart config={{ data: INCOME_EXPENSE_DATA }} />;
}

function BankSyncPreview() {
    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 t-mono text-[10px] font-semibold text-primary">
                        GTB
                    </span>
                    <div>
                        <p className="text-sm text-foreground">Guaranty Trust · ····4821</p>
                        <p className="t-mono text-[11px] text-muted-foreground">Business current</p>
                    </div>
                </div>
                <span className="t-label flex items-center gap-1.5 text-info">
                    <span className="size-1.5 animate-pulse rounded-full bg-info" />
                    Syncing
                </span>
            </div>
            <p className="t-figure-display mt-6 text-foreground">
                {formatCurrency(4_082_650, 'NGN', { compact: true })}
            </p>
            <p className="mt-1 t-mono text-[11px] text-muted-foreground">Balance · synced 2 min ago</p>
        </div>
    );
}

function TaxReportsPreview() {
    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
                <span className="t-label text-muted-foreground">
                    Tax position
                </span>
                <span className="rounded-full bg-positive-tint px-2.5 py-1 t-mono text-[10px] font-medium text-positive">
                    34% margin
                </span>
            </div>
            <div className="mt-4">
                <Row label="Estimated PIT" value={formatCurrency(212_400, 'NGN', { compact: true })} />
                <Row label="VAT payable" value={formatCurrency(58_900, 'NGN', { compact: true })} />
                <Row label="Estimated CIT" value={formatCurrency(0, 'NGN')} />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
                Calculated from income and expenses already synced from your bank.
            </p>
        </div>
    );
}

/**
 * Plays `fn`'s animation once, when `ref`'s element scrolls into view.
 *
 * `fn` bundles its own hidden start state (`gsap.set`) with the tween that
 * reveals it, so it is built inside a gsap context here and its timed
 * animations are held at frame 0. That way the start state lands before
 * first paint -- running the whole of `fn` at `onEnter` would let the
 * content paint, blink out and re-animate, because `top 78%` fires when
 * the element is already on screen.
 *
 * Reduced motion jumps every animation straight to its end state; calling
 * `fn` there would play the very motion the setting asks us to suppress.
 */
function useRevealOnce(ref: RefObject<HTMLElement | null>, fn: () => void, deps: unknown[]) {
    useLayoutEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(fn);
        // Zero-duration `set` calls are the start state: leave them applied.
        const timed: gsap.core.Animation[] = ctx.data.filter(
            (item: unknown): item is gsap.core.Animation =>
                typeof (item as gsap.core.Animation | undefined)?.duration === 'function' &&
                (item as gsap.core.Animation).duration() > 0,
        );

        if (prefersReducedMotion()) {
            timed.forEach((animation) => animation.progress(1));
            return () => ctx.revert();
        }

        timed.forEach((animation) => animation.pause(0));

        setupMotion();
        const trigger = ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 78%',
            once: true,
            onEnter: () => timed.forEach((animation) => animation.play()),
        });

        return () => {
            trigger.kill();
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

const INVOICE_PALETTE = ['#10b981', '#8b5cf6', '#f43f5e', '#0ea5e9'];

/** A themed invoice document forming line by line -- shows the branding claim directly. */
function InvoiceDocumentPreview() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    useRevealOnce(
        wrapperRef,
        () => {
            gsap.set(rowRefs.current, { opacity: 0, y: 6 });
            gsap.to(rowRefs.current, { opacity: 1, y: 0, duration: 0.35, stagger: 0.12 });
        },
        [],
    );

    return (
        <div ref={wrapperRef} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
                <span className="t-display-4 text-foreground">Invoice #014</span>
                <div className="flex gap-1.5">
                    {INVOICE_PALETTE.map((color) => (
                        <span
                            key={color}
                            className="size-3 rounded-full ring-1 ring-border"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
            <p className="mt-1 t-mono text-[11px] text-muted-foreground">Bill to · Adaeze Okonkwo · 14 Aug 2026</p>

            <div className="mt-5 flex flex-col gap-2">
                {[
                    ['Web design: homepage', formatCurrency(65_000, 'NGN', { compact: true })],
                    ['Web design: checkout flow', formatCurrency(20_000, 'NGN', { compact: true })],
                ].map(([label, amount], i) => (
                    <div
                        key={label}
                        ref={(el) => {
                            rowRefs.current[i] = el;
                        }}
                        className="flex items-center justify-between text-sm"
                    >
                        <span className="text-muted-foreground">{label}</span>
                        <span className="t-mono text-foreground">{amount}</span>
                    </div>
                ))}
                <div
                    ref={(el) => {
                        rowRefs.current[2] = el;
                    }}
                    className="mt-2 flex items-center justify-between border-t border-border pt-2 text-sm"
                >
                    <span className="text-muted-foreground">VAT (7.5%)</span>
                    <span className="t-mono text-foreground">
                        {formatCurrency(6_375, 'NGN', { compact: true })}
                    </span>
                </div>
                <div
                    ref={(el) => {
                        rowRefs.current[3] = el;
                    }}
                    className="flex items-center justify-between text-base font-medium"
                >
                    <span className="text-foreground">Total</span>
                    <span className="t-mono text-foreground">
                        {formatCurrency(91_375, 'NGN', { compact: true })}
                    </span>
                </div>
            </div>
        </div>
    );
}

const STEPS = ['Sent', 'Viewed', 'Paid'];

/** The status lifecycle of one invoice, drawing in as a stepper. */
function PaymentTimelinePreview() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLSpanElement>(null);
    const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const receiptRef = useRef<HTMLDivElement>(null);

    useRevealOnce(
        wrapperRef,
        () => {
            gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left' });
            gsap.set(dotRefs.current, { scale: 0.6, backgroundColor: 'var(--color-border)' });
            gsap.set(labelRefs.current, { opacity: 0.5 });
            gsap.set(receiptRef.current, { opacity: 0, y: 6 });

            const tl = gsap.timeline();
            tl.to(lineRef.current, { scaleX: 1, duration: 1, ease: 'power2.out' });
            STEPS.forEach((_, i) => {
                tl.to(
                    dotRefs.current[i],
                    { scale: 1, backgroundColor: 'var(--color-positive)', duration: 0.3 },
                    i * 0.32,
                ).to(labelRefs.current[i], { opacity: 1, duration: 0.3 }, i * 0.32);
            });
            tl.to(receiptRef.current, { opacity: 1, y: 0, duration: 0.4 }, '+=0.1');
        },
        [],
    );

    return (
        <div ref={wrapperRef} className="rounded-2xl border border-border bg-card p-6">
            <span className="t-label text-muted-foreground">
                Invoice #014
            </span>
            <div className="relative mt-8 px-2">
                <span className="absolute top-1.5 right-2 left-2 h-px bg-border" />
                <span ref={lineRef} className="absolute top-1.5 left-2 h-px w-[calc(100%-1rem)] bg-positive" />
                <div className="relative flex justify-between">
                    {STEPS.map((step, i) => (
                        <div key={step} className="flex flex-col items-center gap-2">
                            <span
                                ref={(el) => {
                                    dotRefs.current[i] = el;
                                }}
                                className="size-3 rounded-full"
                            />
                            <span
                                ref={(el) => {
                                    labelRefs.current[i] = el;
                                }}
                                className="t-label text-foreground"
                            >
                                {step}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div
                ref={receiptRef}
                className="mt-6 flex items-center gap-2 rounded-lg bg-positive-tint px-3 py-2.5 text-sm text-positive"
            >
                <CheckCircle2 className="size-4 shrink-0" />
                Receipt sent to client automatically
            </div>
        </div>
    );
}

/** A read-only line from bank to Claryeo, with a pulse to show data actually moving. */
function SyncFlowPreview() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pulseRef = useRef<HTMLSpanElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useRevealOnce(
        wrapperRef,
        () => {
            gsap.set(pulseRef.current, { xPercent: 0, opacity: 0 });
            gsap
                .timeline()
                .to(lineRef.current, { opacity: 1, duration: 0.4 })
                .to(pulseRef.current, { opacity: 1, duration: 0.1 })
                .to(pulseRef.current, { xPercent: 2400, duration: 1.2, ease: 'power1.inOut' })
                .to(pulseRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
        },
        [],
    );

    return (
        <div ref={wrapperRef} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-center gap-2">
                    <span className="flex size-11 items-center justify-center rounded-full bg-muted text-foreground">
                        <Landmark className="size-5" />
                    </span>
                    <span className="t-label text-muted-foreground">Your bank</span>
                </div>
                <div ref={lineRef} className="relative mx-3 h-px flex-1 bg-border opacity-0">
                    <span
                        ref={pulseRef}
                        className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-info"
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Sparkles className="size-5" />
                    </span>
                    <span className="t-label text-muted-foreground">Claryeo</span>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-1.5 t-mono text-[11px] text-muted-foreground">
                <Lock className="size-3" />
                Read-only. Claryeo can never move your money
            </div>
        </div>
    );
}

const FEED_ROWS: { label: string; amount: string; tag: string }[] = [
    { label: 'Uber Nigeria', amount: '-₦4,200', tag: 'Transport' },
    { label: 'Adaeze Okonkwo', amount: '+₦85,000', tag: 'Income' },
    { label: 'Ikeja Electric', amount: '-₦12,600', tag: 'Utilities' },
];

/** Transactions land, then tag themselves -- the auto-categorising claim, shown happening. */
function AutoTagFeedPreview() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useRevealOnce(
        wrapperRef,
        () => {
            gsap.set(rowRefs.current, { opacity: 0, y: 8 });
            gsap.set(tagRefs.current, { opacity: 0, x: -6 });

            const tl = gsap.timeline();
            FEED_ROWS.forEach((_, i) => {
                const at = i * 0.55;
                tl.to(rowRefs.current[i], { opacity: 1, y: 0, duration: 0.3 }, at).to(
                    tagRefs.current[i],
                    { opacity: 1, x: 0, duration: 0.3, ease: 'back.out(2)' },
                    at + 0.25,
                );
            });
        },
        [],
    );

    return (
        <div ref={wrapperRef} className="rounded-2xl border border-border bg-card p-6">
            <span className="t-label text-muted-foreground">
                Just synced
            </span>
            <div className="mt-3 flex flex-col">
                {FEED_ROWS.map((row, i) => (
                    <div
                        key={row.label}
                        ref={(el) => {
                            rowRefs.current[i] = el;
                        }}
                        className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0"
                    >
                        <div className="min-w-0">
                            <p className="truncate text-sm text-foreground">{row.label}</p>
                            <p className="t-mono text-[11px] text-muted-foreground">{row.amount}</p>
                        </div>
                        <span
                            ref={(el) => {
                                tagRefs.current[i] = el;
                            }}
                            className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 t-mono text-[10px] text-primary"
                        >
                            {row.tag}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const TAX_BARS: { label: string; value: string; pct: number }[] = [
    { label: 'PIT', value: formatCurrency(212_400, 'NGN', { compact: true }), pct: 62 },
    { label: 'VAT', value: formatCurrency(58_900, 'NGN', { compact: true }), pct: 34 },
    // Nothing owed, so nothing to fill: a 4% bar next to a zero reads as a bug.
    { label: 'CIT', value: formatCurrency(0, 'NGN', { compact: true }), pct: 0 },
];

/** The three Nigerian tax categories, as bars filling to their share -- distinct from the row-style tax stub used elsewhere. */
function TaxBreakdownBars() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const barRefs = useRef<(HTMLDivElement | null)[]>([]);

    useRevealOnce(
        wrapperRef,
        () => {
            gsap.set(barRefs.current, { scaleX: 0, transformOrigin: 'left' });
            gsap.to(barRefs.current, { scaleX: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
        },
        [],
    );

    return (
        <div ref={wrapperRef} className="rounded-2xl border border-border bg-card p-6">
            <span className="t-label text-muted-foreground">
                This year, so far
            </span>
            <div className="mt-4 flex flex-col gap-4">
                {TAX_BARS.map((bar, i) => (
                    <div key={bar.label}>
                        <div className="flex items-center justify-between t-mono text-[11px] text-muted-foreground">
                            <span className="tracking-widest uppercase">{bar.label}</span>
                            <span className="text-foreground">{bar.value}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                            <div
                                ref={(el) => {
                                    barRefs.current[i] = el;
                                }}
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${bar.pct}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** A single report as it would sit in a picker list -- export buttons included, since exporting is the point. */
function ReportCardPreview() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const barRefs = useRef<(HTMLDivElement | null)[]>([]);
    const actionsRef = useRef<HTMLDivElement>(null);

    useRevealOnce(
        wrapperRef,
        () => {
            gsap.set(barRefs.current, { scaleY: 0, transformOrigin: 'bottom' });
            gsap.set(actionsRef.current, { opacity: 0 });
            gsap
                .timeline()
                .to(barRefs.current, { scaleY: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' })
                .to(actionsRef.current, { opacity: 1, duration: 0.3 }, '-=0.1');
        },
        [],
    );

    const heights = [40, 65, 50, 80, 60, 90];

    return (
        <div ref={wrapperRef} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="t-display-4 text-foreground">Profit &amp; loss</p>
                    <p className="t-mono text-[11px] text-muted-foreground">Aug 2026</p>
                </div>
                <div className="flex h-10 items-end gap-1">
                    {heights.map((h, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                barRefs.current[i] = el;
                            }}
                            className="w-1.5 rounded-t-sm bg-primary/50"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
            </div>
            <div ref={actionsRef} className="mt-5 flex gap-2">
                <span className="rounded-full border border-border px-3 py-1.5 t-mono text-[11px] text-foreground">
                    Export PDF
                </span>
                <span className="rounded-full border border-border px-3 py-1.5 t-mono text-[11px] text-foreground">
                    Export CSV
                </span>
            </div>
        </div>
    );
}

/** A plain-language insight, the way it would surface on a dashboard. */
function InsightCardPreview({
    insight = 'Fuel spend is up 18% this quarter, mostly from 3 trips in July.',
}: {
    insight?: string;
}) {
    const textRef = useTypewriter(insight);

    return (
        <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-pending-tint text-pending">
                    <Lightbulb className="size-4" />
                </span>
                <span className="t-label text-muted-foreground">
                    Insight
                </span>
            </div>
            <p className="mt-3 min-h-11 text-sm text-foreground">
                <span ref={textRef} />
            </p>
        </div>
    );
}

const DRAFT_LINES = [
    ['Web design: homepage', formatCurrency(65_000, 'NGN', { compact: true })],
    ['Web design: checkout flow', formatCurrency(20_000, 'NGN', { compact: true })],
];

/** A one-line prompt turning into invoice line items -- the "drafts your invoices" claim, shown in motion. */
function DraftingPreview() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

    useRevealOnce(
        wrapperRef,
        () => {
            gsap.set(lineRefs.current, { opacity: 0, y: 6 });
            gsap.to(lineRefs.current, { opacity: 1, y: 0, duration: 0.35, stagger: 0.25, delay: 0.3 });
        },
        [],
    );

    return (
        <div ref={wrapperRef} className="rounded-2xl border border-border bg-card p-6">
            <span className="t-label text-muted-foreground">
                You typed
            </span>
            <p className="mt-2 rounded-lg bg-muted px-3 py-2.5 text-sm text-foreground">
                "Web design for Adaeze: homepage and checkout, ₦85k"
            </p>
            <span className="t-label mt-5 block text-muted-foreground">
                Claryeo drafted
            </span>
            <div className="mt-2 flex flex-col gap-2">
                {DRAFT_LINES.map(([label, amount], i) => (
                    <div
                        key={label}
                        ref={(el) => {
                            lineRefs.current[i] = el;
                        }}
                        className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
                    >
                        <span className="text-foreground">{label}</span>
                        <span className="t-mono text-muted-foreground">{amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const PREVIEWS: Record<string, FC> = {
    invoicing: InvoicingPreview,
    'bank-sync': BankSyncPreview,
    'tax-reports': TaxReportsHeroPreview,
    'ai-assistant': AiAssistantPreview,
};

const AiOwesPreview: FC = () => (
    <AiAssistantPreview
        eyebrow="Ask your books"
        question="Who owes me the most right now?"
        answer="Ikeja Retail Co.: ₦210,000 across 2 overdue invoices."
    />
);

/** One bespoke interface per section, matched to what that section claims -- not one widget repeated. */
const SECTION_PREVIEWS: Record<string, FC[]> = {
    invoicing: [InvoiceDocumentPreview, PaymentTimelinePreview, TaxReportsPreview],
    'bank-sync': [SyncFlowPreview, AutoTagFeedPreview, TaxReportsPreview],
    'tax-reports': [TaxBreakdownBars, ReportCardPreview, InsightCardPreview],
    'ai-assistant': [AiOwesPreview, DraftingPreview, InsightCardPreview],
};

const FeaturePage: FC<FeaturePageProps> = ({
    feature,
    cta = { label: 'Get started', href: '/get-started' },
    waitlistMode = false,
}) => {
    if (!feature) {
        return null;
    }

    const Preview = PREVIEWS[feature.slug];

    return (
        <div className="bg-background text-foreground">
            {/* Hero */}
            <section className="border-b border-border">
                <div className="mx-auto grid w-full max-w-[1180px] items-center gap-10 px-4 py-16 md:px-0 md:py-24 lg:grid-cols-2">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="t-eyebrow text-muted-foreground">
                                {feature.eyebrow}
                            </span>
                            {feature.badge && (
                                <span className="t-label rounded-full bg-primary-surface px-2.5 py-1 text-primary-surface-foreground">
                                    {feature.badge}
                                </span>
                            )}
                        </div>

                        <h1 className="t-display-1 mt-5 text-foreground">
                            {feature.tagline}
                        </h1>
                        <p className="t-lead mt-5 max-w-xl text-muted-foreground">
                            {feature.heroParagraph}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <a
                                href={cta.href}
                                className="bg-gradient-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                            >
                                {cta.label}
                                <ArrowUpRight className="size-4" />
                            </a>
                            {!waitlistMode && (
                                <a
                                    href="/tax-calculator"
                                    className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                                >
                                    Try the tax calculator
                                </a>
                            )}
                        </div>

                        {feature.highlights.length > 0 && (
                            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                                {feature.highlights.map((h) => (
                                    <div key={h.label}>
                                        <div className="t-figure-display text-2xl text-foreground">
                                            {h.value}
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            {h.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>{Preview ? <Preview /> : null}</div>
                </div>
            </section>

            {/* Content sections — alternating */}
            <section className="mx-auto w-full max-w-[1180px] px-4 py-16 md:px-0 md:py-24">
                <div className="flex flex-col gap-16 md:gap-24">
                    {feature.sections.map((section, index) => (
                        <div
                            key={section.heading}
                            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
                        >
                            <div
                                className={
                                    index % 2 === 1 ? 'md:order-2' : undefined
                                }
                            >
                                <h2 className="t-display-3 text-foreground">
                                    {section.heading}
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    {section.body}
                                </p>
                                {section.bullets.length > 0 && (
                                    <ul className="mt-6 flex flex-col gap-3">
                                        {section.bullets.map((bullet) => (
                                            <li
                                                key={bullet}
                                                className="flex items-start gap-3 text-sm text-foreground"
                                            >
                                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-positive-tint text-positive">
                                                    <Check
                                                        className="size-3"
                                                        strokeWidth={3}
                                                    />
                                                </span>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className={index % 2 === 1 ? 'md:order-1' : undefined}>
                                {(() => {
                                    const SectionPreview = SECTION_PREVIEWS[feature.slug]?.[index];
                                    return SectionPreview ? <SectionPreview /> : null;
                                })()}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQs */}
            {feature.faqs.length > 0 && (
                <section className="border-t border-border bg-muted/20">
                    <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-24">
                        <div className="text-center">
                            <span className="t-eyebrow text-muted-foreground">
                                Questions
                            </span>
                            <h2 className="t-display-2 mt-3 text-foreground">
                                <em>Answers</em>, before you ask
                            </h2>
                            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                                Everything you need to know about {feature.title.toLowerCase()} on Claryeo.
                            </p>
                        </div>
                        <Accordion type="single" collapsible className="mt-10">
                            {feature.faqs.map((faq, index) => (
                                <AccordionItem
                                    key={faq.question}
                                    value={`faq-${index}`}
                                >
                                    <AccordionTrigger className="text-left text-base font-medium text-foreground">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="border-t border-border bg-primary/10 py-16 transition-colors duration-300 dark:bg-primary-surface">
                <div className="mx-auto max-w-[1180px] px-4 text-center md:px-0">
                    <h2 className="t-display-2 text-foreground">
                        Ready to put {feature.title.toLowerCase()} to work?
                    </h2>
                    <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
                        Invoicing, expenses, and tax in one place, with AI across
                        the app. Get set up in minutes.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <a
                            href={cta.href}
                            className="bg-gradient-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                        >
                            {cta.label}
                            <ArrowUpRight className="size-4" />
                        </a>
                        <a
                            href="/features"
                            className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                            Explore all features
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturePage;
