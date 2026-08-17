import type { FC } from 'react';

import GuideCta from '@/components/guide-cta';
import GuideLayout from '@/components/guide-layout';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { buildFaqSchema } from '@/lib/structured-data';

const faqs = [
    {
        id: 'inv-faq-1',
        question: 'Is it mandatory to issue invoices in Nigeria?',
        answer: 'While there is no general legal requirement for all businesses to issue invoices, VAT-registered businesses must issue VAT invoices for all taxable supplies. Additionally, invoices serve as essential business records for tax filing, auditing, and dispute resolution. It is strongly recommended that all businesses issue invoices for every transaction.',
    },
    {
        id: 'inv-faq-2',
        question: 'What is the difference between an invoice and a receipt?',
        answer: 'An invoice is a request for payment sent before or at the time of delivery. A receipt is proof that payment has been received. Invoices are issued by the seller to the buyer as a bill, while receipts are issued after the buyer has paid. For tax purposes, both documents serve different roles: invoices track revenue owed, and receipts confirm income received.',
    },
    {
        id: 'inv-faq-3',
        question: 'Do I need to include VAT on my invoices?',
        answer: 'Only if you are VAT-registered (annual turnover above ₦25 million). VAT-registered businesses must show VAT as a separate line item at 7.5% of the taxable amount. Non-VAT-registered businesses should not charge or show VAT on their invoices.',
    },
    {
        id: 'inv-faq-4',
        question: 'What currency should invoices be in?',
        answer: 'Invoices in Nigeria are typically issued in Nigerian Naira (₦ / NGN). However, if you work with international clients, you can issue invoices in foreign currencies (USD, GBP, EUR, etc.). For tax purposes, foreign currency income must be converted to Naira using the CBN exchange rate at the date of the transaction.',
    },
    {
        id: 'inv-faq-5',
        question: 'How long should I keep copies of invoices?',
        answer: 'Nigerian tax law requires businesses to keep financial records for at least 6 years. This includes copies of all invoices (both sent and received), receipts, bank statements, and expense records. Digital copies are acceptable as long as they are legible and properly backed up.',
    },
];

const InvoiceGuideNigeria: FC = () => (
    <GuideLayout
        title="How to Create Professional Invoices in Nigeria: Complete Guide"
        description="Learn how to create professional invoices in Nigeria: what to include, VAT invoice requirements, payment terms, and best practices for freelancers and small businesses."
        canonical="https://claryeo.com/guides/invoice-guide-nigeria"
        keywords="invoice template Nigeria, how to create invoice Nigeria, Nigerian invoice requirements, VAT invoice Nigeria, professional invoice, invoice guide"
        publishedDate="2026-04-06"
        modifiedDate="2026-04-06"
        breadcrumbTitle="Invoice Guide"
        structuredData={buildFaqSchema(
            faqs.map((f) => ({ question: f.question, answer: f.answer })),
        )}
    >
        <h1 className="t-display-2">
            How to Create Professional Invoices in Nigeria
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
            Updated April 2026 &middot; 6 min read
        </p>

        <p className="t-body mt-6 text-muted-foreground">
            A professional invoice is more than a payment request. It is a
            legal document that establishes a clear record of work done, amounts
            owed, and payment terms. Whether you are a freelancer billing a
            client or a small business invoicing customers, getting your
            invoicing right builds trust, speeds up payment, and keeps you
            tax-ready.
        </p>

        <h2 className="t-display-3 mt-10">
            What to Include on Every Invoice
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            A complete Nigerian invoice should include the following elements:
        </p>
        <ol className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    1.
                </span>
                <span>
                    <strong className="text-foreground">
                        Your business details:
                    </strong>{' '}
                    Business name, address, phone number, email, and TIN (if
                    registered).
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    2.
                </span>
                <span>
                    <strong className="text-foreground">Client details:</strong>{' '}
                    Client's name, company name, and address.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    3.
                </span>
                <span>
                    <strong className="text-foreground">Invoice number:</strong>{' '}
                    A unique, sequential number for tracking (e.g., INV-001,
                    INV-002).
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    4.
                </span>
                <span>
                    <strong className="text-foreground">
                        Invoice date and due date:
                    </strong>{' '}
                    When the invoice was issued and when payment is expected.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    5.
                </span>
                <span>
                    <strong className="text-foreground">Line items:</strong>{' '}
                    Description of each product or service, quantity, unit
                    price, and total for each line.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    6.
                </span>
                <span>
                    <strong className="text-foreground">Subtotal:</strong> Sum
                    of all line items before tax.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    7.
                </span>
                <span>
                    <strong className="text-foreground">
                        VAT (if applicable):
                    </strong>{' '}
                    7.5% shown as a separate line item for VAT-registered
                    businesses.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    8.
                </span>
                <span>
                    <strong className="text-foreground">Total amount:</strong>{' '}
                    The final amount due including any taxes.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    9.
                </span>
                <span>
                    <strong className="text-foreground">
                        Payment details:
                    </strong>{' '}
                    Bank name, account number, and account name for payment.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    10.
                </span>
                <span>
                    <strong className="text-foreground">Payment terms:</strong>{' '}
                    Net 30, Net 15, due on receipt, etc.
                </span>
            </li>
        </ol>

        <h2 className="t-display-3 mt-10">VAT Invoice Requirements</h2>
        <p className="t-body mt-3 text-muted-foreground">
            If your business is VAT-registered (annual turnover above ₦25
            million), your invoices must comply with FIRS requirements. A VAT
            invoice must additionally include:
        </p>
        <ul className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Your VAT registration number (FIRS TIN)</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>VAT amount shown separately at 7.5%</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>The words "VAT Invoice" clearly displayed</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    Breakdown of VAT-exempt vs. VAT-inclusive items (if mixed)
                </span>
            </li>
        </ul>

        <GuideCta
            heading="Create professional invoices in minutes"
            description="Claryeo lets you create, send, and track invoices, with automatic tax calculations built in."
            buttonText="Join the waitlist"
            buttonHref="/waitlist"
        />

        <h2 className="t-display-3 mt-10">
            Common Payment Terms in Nigeria
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            Payment terms define when you expect to be paid. The most common
            terms used in Nigeria:
        </p>
        <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-semibold">
                            Term
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            Meaning
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            Best For
                        </th>
                    </tr>
                </thead>
                <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3 font-medium text-foreground">
                            Due on receipt
                        </td>
                        <td className="px-4 py-3">
                            Payment expected immediately
                        </td>
                        <td className="px-4 py-3">Small jobs, new clients</td>
                    </tr>
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3 font-medium text-foreground">
                            Net 15
                        </td>
                        <td className="px-4 py-3">
                            Payment due within 15 days
                        </td>
                        <td className="px-4 py-3">
                            Freelancers, short projects
                        </td>
                    </tr>
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3 font-medium text-foreground">
                            Net 30
                        </td>
                        <td className="px-4 py-3">
                            Payment due within 30 days
                        </td>
                        <td className="px-4 py-3">Most common, B2B standard</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3 font-medium text-foreground">
                            50% upfront
                        </td>
                        <td className="px-4 py-3">
                            Half before work, half on delivery
                        </td>
                        <td className="px-4 py-3">
                            Large projects, new clients
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2 className="t-display-3 mt-10">Invoice Best Practices</h2>
        <ul className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Send invoices promptly.
                    </strong>{' '}
                    Invoice as soon as work is completed or at agreed
                    milestones. Delayed invoicing leads to delayed payment.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Use sequential invoice numbers.
                    </strong>{' '}
                    This makes tracking, reconciliation, and auditing much
                    easier.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Be specific in line items.
                    </strong>{' '}
                    "Website development: 5-page business site" is better than
                    "Web services".
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Follow up on overdue invoices.
                    </strong>{' '}
                    Send a polite reminder the day after the due date, then
                    follow up weekly.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Keep records for 6 years.
                    </strong>{' '}
                    Nigerian tax law requires you to retain financial records
                    for at least 6 years for audit purposes.
                </span>
            </li>
        </ul>

        <h2 className="t-display-3 mt-10">
            Invoicing and Tax Compliance
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            Your invoices are the foundation of your tax records. They prove
            your income, support your expense claims, and provide the audit
            trail tax authorities need. For{' '}
            <a
                href="/guides/freelancer-tax-nigeria"
                className="font-medium text-primary hover:underline"
            >
                freelancers
            </a>{' '}
            and{' '}
            <a
                href="/guides/small-business-tax-nigeria"
                className="font-medium text-primary hover:underline"
            >
                small businesses
            </a>
            , consistent invoicing is the difference between a smooth tax filing
            season and a stressful scramble.
        </p>

        <h2 className="t-display-3 mt-10">Frequently Asked Questions</h2>
        <div className="mt-6">
            <Accordion
                type="single"
                collapsible
                className="w-full rounded-2xl bg-muted p-1 dark:bg-muted/50"
            >
                {faqs.map((item) => (
                    <div className="group" key={item.id}>
                        <AccordionItem
                            value={item.id}
                            className="rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:bg-card data-[state=open]:shadow-sm dark:data-[state=open]:bg-muted"
                        >
                            <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-base">{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                        <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                    </div>
                ))}
            </Accordion>
        </div>

        <h2 className="t-display-3 mt-10">Related Guides</h2>
        <ul className="mt-4 space-y-2 text-base">
            <li>
                <a
                    href="/guides/freelancer-tax-nigeria"
                    className="text-primary hover:underline"
                >
                    How Freelancers Pay Tax in Nigeria
                </a>
            </li>
            <li>
                <a
                    href="/guides/small-business-tax-nigeria"
                    className="text-primary hover:underline"
                >
                    Small Business Tax in Nigeria
                </a>
            </li>
            <li>
                <a
                    href="/guides/paye-tax-nigeria"
                    className="text-primary hover:underline"
                >
                    PAYE Tax in Nigeria: Complete Guide
                </a>
            </li>
        </ul>
    </GuideLayout>
);

export default InvoiceGuideNigeria;
