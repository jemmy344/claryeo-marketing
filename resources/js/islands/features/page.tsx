import {
    ArrowUpRight,
    BarChart3,
    FileText,
    RefreshCw,
    Sparkles,
    type LucideIcon,
} from 'lucide-react';
import type { FC } from 'react';

type FeatureCard = {
    slug: string;
    title: string;
    eyebrow: string;
    tagline: string;
    badge?: string | null;
    icon: string;
    href: string;
};

type FeaturesProps = {
    features?: FeatureCard[];
};

const ICONS: Record<string, LucideIcon> = {
    FileText,
    RefreshCw,
    BarChart3,
    Sparkles,
};

const Features: FC<FeaturesProps> = ({ features = [] }) => (
    <div className="bg-background text-foreground">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
            <div className="pointer-events-none absolute inset-0">
                <div className="bg-gradient-primary absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full opacity-10 blur-3xl" />
            </div>
            <div className="relative mx-auto max-w-3xl px-4 py-16 text-center md:px-6 md:py-24">
                <span className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
                    Features
                </span>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl xl:text-6xl">
                    Everything you need to run your business
                </h1>
                <p className="mt-5 text-lg text-muted-foreground">
                    An AI-powered experience across the app — automatic bank
                    sync, realtime tracking, invoicing, and export-ready tax
                    summaries. Without the long forms or the complexity. Rolling
                    out in Nigeria first.
                </p>
            </div>
        </section>

        {/* Feature cards */}
        <section className="mx-auto w-full max-w-[1180px] px-4 py-16 md:px-0 md:py-24">
            <div className="grid gap-6 md:grid-cols-2">
                {features.map((feature) => {
                    const Icon = ICONS[feature.icon] ?? Sparkles;

                    return (
                        <a
                            key={feature.slug}
                            href={feature.href}
                            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                        >
                            <div className="bg-gradient-primary pointer-events-none absolute -top-16 -right-16 size-48 rounded-full opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.14]" />

                            <div className="relative flex items-center justify-between">
                                <div className="bg-gradient-primary flex size-12 items-center justify-center rounded-2xl text-primary-foreground shadow-sm">
                                    <Icon className="size-6" />
                                </div>
                                {feature.badge && (
                                    <span className="bg-gradient-primary inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
                                        <Sparkles className="size-3" />
                                        {feature.badge}
                                    </span>
                                )}
                            </div>

                            <h2 className="relative mt-6 text-xl font-semibold tracking-tight text-foreground">
                                {feature.title}
                            </h2>
                            <p className="relative mt-2 text-muted-foreground">
                                {feature.tagline}
                            </p>

                            <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                                Explore {feature.title.toLowerCase()}
                                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </a>
                    );
                })}
            </div>
        </section>

        {/* Closing line */}
        <section className="border-t border-border bg-muted/20 py-12 transition-colors duration-300 md:py-16">
            <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
                <p className="text-xl font-semibold text-balance text-foreground md:text-2xl">
                    Smart tools and simple flows so you can focus on your
                    business.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                    Nigeria first · More regions coming soon
                </p>
            </div>
        </section>
    </div>
);

export default Features;
