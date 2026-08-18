import { ChevronRight } from 'lucide-react';
import type { FC, ReactNode } from 'react';

import SiteCta from '@/components/site-cta';
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
        <>
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
            </article>

            <SiteCta
                heading="Take control of your finances with Claryeo"
                body="Invoicing, expense tracking, and tax-ready summaries, built for freelancers and small businesses in Nigeria."
                primary={{ label: 'Join the waitlist', href: '/waitlist' }}
                secondary={{
                    label: 'Try the free tax calculator',
                    href: '/tax-calculator',
                }}
            />
        </>
    );
};

export default GuideLayout;
