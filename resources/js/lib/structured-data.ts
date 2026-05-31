type FaqItem = {
    question: string;
    answer: string;
};

type ArticleOptions = {
    headline: string;
    description: string;
    datePublished: string;
    dateModified: string;
    author: string;
    url: string;
    image?: string;
};

type BreadcrumbItem = {
    name: string;
    url: string;
};

export function buildFaqSchema(faqs: FaqItem[]): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function buildArticleSchema(
    opts: ArticleOptions,
): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: opts.headline,
        description: opts.description,
        datePublished: opts.datePublished,
        dateModified: opts.dateModified,
        author: {
            '@type': 'Organization',
            name: opts.author,
        },
        url: opts.url,
        publisher: {
            '@type': 'Organization',
            name: 'Claryeo',
            url: 'https://claryeo.com',
        },
        ...(opts.image && { image: opts.image }),
    };
}

export function buildBreadcrumbSchema(
    items: BreadcrumbItem[],
): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
