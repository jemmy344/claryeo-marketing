import { ArrowUpRight, ChevronRight } from 'lucide-react';
import type { FC, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
    buildArticleSchema,
    buildBreadcrumbSchema,
} from '@/lib/structured-data';

type GuideLayoutProps = {
    title: string;
    description: string;
    canonical: string;
    keywords?: string;
    publishedDate: string;
    modifiedDate: string;
    breadcrumbTitle: string;
    structuredData?: Record<string, unknown> | Record<string, unknown>[];
    children: ReactNode;
};

/**
 * Marketing port of the main app's GuideLayout. The Antlers shell provides the
 * nav/footer and the document <head> (title/description/canonical come from the
 * controller); here we render the article chrome + JSON-LD for the guide body.
 */
const GuideLayout: FC<GuideLayoutProps> = ({
    title,
    description,
    canonical,
    publishedDate,
    modifiedDate,
    breadcrumbTitle,
    structuredData,
    children,
}) => {
    const articleSchema = buildArticleSchema({
        headline: title,
        description,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        author: 'Claryeo',
        url: canonical,
    });

    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: 'Home', url: 'https://claryeo.com' },
        { name: 'Guides', url: 'https://claryeo.com/guides' },
        { name: breadcrumbTitle, url: canonical },
    ]);

    const allStructuredData = [
        articleSchema,
        breadcrumbSchema,
        ...(structuredData
            ? Array.isArray(structuredData)
                ? structuredData
                : [structuredData]
            : []),
    ];

    return (
        <article className="mx-auto max-w-4xl px-4 py-10 md:py-14">
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(allStructuredData),
                }}
            />

            <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
                <a href="/" className="hover:text-foreground">
                    Home
                </a>
                <ChevronRight className="size-3.5" />
                <span>Guides</span>
                <ChevronRight className="size-3.5" />
                <span className="text-foreground">{breadcrumbTitle}</span>
            </nav>

            <div className="prose-claryeo">{children}</div>

            <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 text-center md:p-12">
                <h2 className="t-display-3">
                    Take control of your finances with Claryeo
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                    Invoicing, expense tracking, and tax-ready summaries, built
                    for freelancers and small businesses in Nigeria. Join the
                    waitlist to get your invite first.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button
                        asChild
                        className="bg-gradient-primary text-primary-foreground hover:opacity-90"
                    >
                        <a href="/waitlist">
                            Join the waitlist
                            <ArrowUpRight className="size-4" />
                        </a>
                    </Button>
                    <Button asChild variant="outline">
                        <a href="/tax-calculator">
                            Try the free tax calculator
                        </a>
                    </Button>
                </div>
            </section>
        </article>
    );
};

export default GuideLayout;
