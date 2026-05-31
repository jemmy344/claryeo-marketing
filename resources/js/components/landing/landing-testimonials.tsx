import type { FC } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const testimonials = [
    {
        quote: 'Claryeo has transformed the way I manage invoicing and tax. Invoicing, expenses, and FIRS-ready summaries in one place. A game-changer for freelancers in Nigeria.',
        author: 'Shekinah T.',
        role: 'Freelance Designer',
        fallback: 'ST',
        featured: true,
    },
    {
        quote: 'Clean, simple, and tax-ready. Exactly what our small business needed. We’re rolling it out to the whole team.',
        author: 'Jonathan Y.',
        role: 'Small Business Owner',
        fallback: 'JY',
        featured: false,
    },
    {
        quote: 'Great work on the tax summaries. One of the best tools I’ve seen for Nigerian freelancers.',
        author: 'Yucel F.',
        role: 'Software Engineer',
        fallback: 'YF',
        featured: false,
    },
    {
        quote: 'Expense tracking and reports are a game-changer. Join the waitlist if you haven’t already.',
        author: 'Rodrigo A.',
        role: 'Freelancer',
        fallback: 'RA',
        featured: false,
    },
];

const avatarClass =
    'size-12 bg-primary-surface text-primary-surface-foreground font-medium';

const LandingTestimonials: FC = () => (
    <section
        id="testimonials"
        className="py-16 transition-colors duration-300 md:py-32"
    >
        <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
            <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                <h2 className="text-4xl font-medium text-foreground lg:text-5xl">
                    Built for growing businesses. Loved by those who hate
                    bookkeeping
                </h2>
                <p className="text-muted-foreground">
                    Claryeo brings together invoicing, expenses, and tax
                    summaries so you can focus on what you do best.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
                <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
                    <CardHeader>
                        <img
                            src="/favicon.svg"
                            alt="Claryeo"
                            className="h-6 w-fit dark:invert"
                        />
                    </CardHeader>
                    <CardContent>
                        <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                            <p className="text-xl font-medium text-foreground">
                                {testimonials[0].quote}
                            </p>
                            <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                <Avatar className={avatarClass}>
                                    <AvatarFallback className="bg-primary-surface text-primary-surface-foreground font-medium">
                                        {testimonials[0].fallback}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <cite className="block text-sm font-medium text-foreground not-italic">
                                        {testimonials[0].author}
                                    </cite>
                                    <span className="block text-sm text-muted-foreground">
                                        {testimonials[0].role}
                                    </span>
                                </div>
                            </div>
                        </blockquote>
                    </CardContent>
                </Card>
                {testimonials.slice(1).map((t) => (
                    <Card key={t.author}>
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium text-foreground">
                                    {t.quote}
                                </p>
                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className={avatarClass}>
                                        <AvatarFallback className="bg-primary-surface text-primary-surface-foreground font-medium">
                                            {t.fallback}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="block text-sm font-medium text-foreground not-italic">
                                            {t.author}
                                        </cite>
                                        <span className="block text-sm text-muted-foreground">
                                            {t.role}
                                        </span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

export default LandingTestimonials;
