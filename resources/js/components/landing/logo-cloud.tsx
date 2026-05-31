import type { FC } from 'react';

const logoUrls = [
    {
        src: 'https://html.tailus.io/blocks/customers/nvidia.svg',
        alt: 'Nvidia',
        h: 5,
    },
    {
        src: 'https://html.tailus.io/blocks/customers/column.svg',
        alt: 'Column',
        h: 4,
    },
    {
        src: 'https://html.tailus.io/blocks/customers/github.svg',
        alt: 'GitHub',
        h: 4,
    },
    {
        src: 'https://html.tailus.io/blocks/customers/nike.svg',
        alt: 'Nike',
        h: 5,
    },
    {
        src: '/logo.svg',
        alt: 'Claryeo',
        h: 4,
    },
    {
        src: 'https://html.tailus.io/blocks/customers/lilly.svg',
        alt: 'Lilly',
        h: 7,
    },
    {
        src: 'https://html.tailus.io/blocks/customers/lemonsqueezy.svg',
        alt: 'Lemon Squeezy',
        h: 5,
    },
    {
        src: 'https://html.tailus.io/blocks/customers/openai.svg',
        alt: 'OpenAI',
        h: 6,
    },
    {
        src: 'https://html.tailus.io/blocks/customers/tailwindcss.svg',
        alt: 'Tailwind CSS',
        h: 4,
    },
    {
        src: 'https://html.tailus.io/blocks/customers/vercel.svg',
        alt: 'Vercel',
        h: 5,
    },
    {
        src: 'https://html.tailus.io/blocks/customers/zapier.svg',
        alt: 'Zapier',
        h: 5,
    },
];

const LogoCloud: FC = () => (
    <section className="bg-background py-16 transition-colors duration-300">
        <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-center text-lg font-medium text-foreground">
                Your favorite companies are our partners.
            </h2>
            <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
                {logoUrls.map(({ src, alt, h }) => (
                    <img
                        key={alt}
                        className={`w-fit dark:invert ${h === 7 ? 'h-7' : h === 6 ? 'h-6' : h === 5 ? 'h-5' : 'h-4'}`}
                        src={src}
                        alt={`${alt} Logo`}
                        height={h === 7 ? 28 : h === 6 ? 24 : h === 5 ? 20 : 16}
                        width="auto"
                    />
                ))}
            </div>
        </div>
    </section>
);

export default LogoCloud;
