import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import type { FC } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

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

const FeaturePage: FC<FeaturePageProps> = ({
    feature,
    cta = { label: 'Get started', href: '/get-started' },
    waitlistMode = false,
}) => {
    if (!feature) {
        return null;
    }

    const hasMedia = Boolean(feature.media?.src);

    return (
        <div className="bg-background text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="pointer-events-none absolute inset-0">
                    <div className="bg-gradient-primary absolute -top-24 -left-16 h-96 w-96 rounded-full opacity-10 blur-3xl" />
                    <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 px-4 py-16 md:px-0 md:py-24 lg:grid-cols-2">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
                                {feature.eyebrow}
                            </span>
                            {feature.badge && (
                                <span className="bg-gradient-primary inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
                                    <Sparkles className="size-3" />
                                    {feature.badge}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl xl:text-6xl">
                            {feature.tagline}
                        </h1>
                        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
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
                                        <div className="text-2xl font-semibold tracking-tight text-foreground">
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

                    <div className="relative">
                        <div className="bg-gradient-primary absolute -inset-3 rounded-[2rem] opacity-10 blur-2xl" />
                        <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl">
                            {hasMedia ? (
                                <img
                                    src={feature.media!.src}
                                    alt={feature.media!.alt}
                                    loading="eager"
                                    className="aspect-[4/3] w-full object-cover"
                                />
                            ) : (
                                <div className="bg-gradient-primary flex aspect-[4/3] w-full items-center justify-center opacity-90">
                                    <Sparkles className="size-12 text-primary-foreground" />
                                </div>
                            )}
                        </div>
                    </div>
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
                                <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                                    {section.heading}
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    {section.body}
                                </p>
                                <ul className="mt-6 flex flex-col gap-3">
                                    {section.bullets.map((bullet) => (
                                        <li
                                            key={bullet}
                                            className="flex items-start gap-3 text-sm text-foreground"
                                        >
                                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                                                <Check
                                                    className="size-3"
                                                    strokeWidth={3}
                                                />
                                            </span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div
                                className={
                                    index % 2 === 1 ? 'md:order-1' : undefined
                                }
                            >
                                <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-8">
                                    <div className="bg-gradient-primary pointer-events-none absolute -top-12 -right-12 size-48 rounded-full opacity-10 blur-2xl" />
                                    <div className="relative grid gap-3">
                                        {section.bullets.slice(0, 4).map((b, i) => (
                                            <div
                                                key={b}
                                                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
                                                style={{
                                                    marginLeft: `${i * 12}px`,
                                                }}
                                            >
                                                <span className="bg-gradient-primary flex size-7 shrink-0 items-center justify-center rounded-lg text-primary-foreground">
                                                    <Check
                                                        className="size-3.5"
                                                        strokeWidth={3}
                                                    />
                                                </span>
                                                <span className="truncate text-sm font-medium text-foreground">
                                                    {b}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQs */}
            {feature.faqs.length > 0 && (
                <section className="border-t border-border bg-muted/20">
                    <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-24">
                        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
                            Frequently asked questions
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
                            Everything you need to know about {feature.title.toLowerCase()} on Claryeo.
                        </p>
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
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                        Ready to put {feature.title.toLowerCase()} to work?
                    </h2>
                    <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
                        Invoicing, expenses, and tax in one place — with AI across
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
