import type { FC, ReactNode } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export type FaqItem = { question: string; answer: string };

/**
 * The site's only FAQ accordion. `not-prose` is deliberate: guides and blog
 * posts render inside .prose-claryeo, which otherwise styles the <h3> Radix
 * wraps every trigger in and blows the list apart with heading margins.
 */
export const FaqAccordion: FC<{ items: FaqItem[]; className?: string }> = ({
    items,
    className,
}) => (
    <Accordion
        type="single"
        collapsible
        className={cn('not-prose w-full', className)}
    >
        {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="cursor-pointer text-left text-base font-medium text-foreground hover:no-underline">
                    {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
);

/** Standalone FAQ section: eyebrow, heading, blurb, accordion. */
const FaqSection: FC<{
    items: FaqItem[];
    eyebrow?: string;
    heading?: ReactNode;
    description?: ReactNode;
    id?: string;
    className?: string;
    children?: ReactNode;
}> = ({
    items,
    eyebrow = 'Questions',
    heading,
    description,
    id,
    className,
    children,
}) => (
    <section
        id={id}
        className={cn('border-t border-border bg-muted/20', className)}
    >
        <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-24">
            <div className="text-center">
                <span className="t-eyebrow text-muted-foreground">
                    {eyebrow}
                </span>
                <h2 className="t-display-2 mt-3 text-foreground">
                    {heading ?? (
                        <>
                            <em>Answers</em>, before you ask
                        </>
                    )}
                </h2>
                {description && (
                    <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            <FaqAccordion items={items} className="mt-10" />
            {children}
        </div>
    </section>
);

export default FaqSection;
