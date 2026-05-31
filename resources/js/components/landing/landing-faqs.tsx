import {
    Activity,
    BarChart3,
    Calculator,
    FileText,
    Globe,
    RefreshCw,
    Sparkles,
    Wallet,
} from 'lucide-react';
import type { FC } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        id: 'item-1',
        q: 'How do I create and send invoices?',
        icon: FileText,
        a: 'Create professional invoices in minutes. Add your clients, line items, and due dates. Send invoices by email or download as PDF. Track status so you know when they’re viewed or paid.',
    },
    {
        id: 'item-2',
        q: 'What is AI-Powered invoicing?',
        icon: Sparkles,
        a: 'Describe the work by speaking it out loud or pasting a brief—our AI listens and suggests accurate line items and amounts. One click applies everything into a professional invoice you can edit. Less typing, fewer errors, so you can focus on delivery.',
    },
    {
        id: 'item-3',
        q: 'Can I track expenses and receipts?',
        icon: Wallet,
        a: 'Yes. Categorize and track every business expense in one place. Attach receipts, tag by category, and see totals by period. Your data stays private and is ready for tax time.',
    },
    {
        id: 'item-4',
        q: 'How does transaction sync work?',
        icon: RefreshCw,
        a: 'Connect your bank once and your transaction (data) syncs automatically. No manual entry or statement uploads—transactions flow in so you spend less time on data entry and more on your business.',
    },
    {
        id: 'item-5',
        q: 'What is realtime account tracking?',
        icon: Activity,
        a: 'Realtime tracking and analysis shows your cash flow, balances, and business health as they update. Make decisions with current data, not last month’s—so you’re always in the know.',
    },
    {
        id: 'item-6',
        q: 'What tax summaries does Claryeo provide?',
        icon: Calculator,
        a: 'Claryeo gives you PIT (Personal Income Tax), CIT (Corporate Income Tax), and VAT breakdowns by period. In Nigeria we align with FIRS so you get tax-ready summaries. Rolling out in more regions soon.',
    },
    {
        id: 'item-7',
        q: 'Can I use Claryeo outside Nigeria?',
        icon: Globe,
        a: 'Claryeo is built for freelancers and businesses everywhere. We’re rolling out in Nigeria first; more regions will follow.',
    },
    {
        id: 'item-8',
        q: 'What reports can I export?',
        icon: BarChart3,
        a: 'Get profit & loss, cash flow, and expense summaries. Export to PDF or CSV for your records or your accountant. Reports are generated from your invoices and expenses.',
    },
];

const LandingFAQs: FC = () => (
    <section className="py-16 md:py-24" id="faq">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
            <div className="mx-auto max-w-xl text-center">
                <h2 className="text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
                    Frequently Asked Questions
                </h2>
                <p className="mt-4 text-balance text-muted-foreground">
                    Discover quick and comprehensive answers to common questions
                    about our platform, services, and features.
                </p>
            </div>

            <div className="mx-auto mt-12 max-w-xl">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full rounded-2xl bg-muted p-1 dark:bg-muted/50"
                >
                    {faqs.map((item) => (
                        <div className="group" key={item.id}>
                            <AccordionItem
                                value={item.id}
                                className="peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:bg-card data-[state=open]:shadow-sm dark:data-[state=open]:bg-muted"
                            >
                                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                                    {item.q}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base">{item.a}</p>
                                </AccordionContent>
                            </AccordionItem>
                            <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                        </div>
                    ))}
                </Accordion>

                <p className="mt-6 px-8 text-muted-foreground">
                    Can't find what you're looking for? Contact our{' '}
                    <a
                        href="mailto:hello@claryeo.com"
                        className="font-medium text-primary hover:underline"
                    >
                        customer support team
                    </a>
                </p>
            </div>
        </div>
    </section>
);

export default LandingFAQs;
