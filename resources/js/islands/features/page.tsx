import { ArrowUpRight } from 'lucide-react';
import type { FC } from 'react';

type FeatureCard = {
    slug: string;
    title: string;
    eyebrow: string;
    tagline: string;
    body: string;
    highlight?: string | null;
    badge?: string | null;
    href: string;
};

type FeaturesProps = {
    features?: FeatureCard[];
};

const Features: FC<FeaturesProps> = ({ features = [] }) => (
    <div className="bg-background text-foreground">
        {/* Hero */}
        <section className="border-b border-border">
            <div className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6 md:py-24">
                <span className="t-eyebrow text-muted-foreground">
                    Features
                </span>
                <h1 className="t-display-1 mt-4 text-foreground">
                    <em>Everything</em> you need to run your business
                </h1>
                <p className="t-lead mt-5 text-muted-foreground">
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
                {features.map((feature) => (
                    <div
                        key={feature.slug}
                        className="flex flex-col rounded-2xl border border-border bg-card p-8"
                    >
                        <div className="flex items-center justify-between">
                            <span className="t-eyebrow text-muted-foreground">
                                {feature.eyebrow}
                            </span>
                            {feature.badge && (
                                <span className="t-label rounded-full bg-primary-surface px-2.5 py-1 text-primary-surface-foreground">
                                    {feature.badge}
                                </span>
                            )}
                        </div>

                        <h2 className="t-display-2 mt-4 text-foreground">
                            {feature.title}
                        </h2>
                        <p className="mt-3 text-muted-foreground">{feature.body}</p>

                        {feature.highlight && (
                            <p className="mt-4 font-medium text-foreground">
                                {feature.highlight}
                            </p>
                        )}

                        <a
                            href={feature.href}
                            className="bg-gradient-primary group mt-8 inline-flex w-fit items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                        >
                            Explore {feature.title.toLowerCase()}
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                ))}
            </div>
        </section>

        {/* Closing line */}
        <section className="border-t border-border bg-muted/20 py-12 transition-colors duration-300 md:py-16">
            <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
                <p className="t-display-3 text-balance text-foreground">
                    Smart tools and simple flows so you can focus on your
                    business.
                </p>
                <p className="t-eyebrow mt-3 text-muted-foreground">
                    Nigeria first · More regions coming soon
                </p>
            </div>
        </section>
    </div>
);

export default Features;
