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
        id: 'free-faq-1',
        question: 'Do freelancers need to register with a tax authority?',
        answer: 'Yes. All individuals earning income in Nigeria are required to register with their State Internal Revenue Service (SIRS) and obtain a Tax Identification Number (TIN). This applies whether you freelance full-time or as a side hustle alongside employment.',
    },
    {
        id: 'free-faq-2',
        question: 'Can freelancers claim expenses to reduce tax?',
        answer: 'Yes. Freelancers can deduct expenses that are wholly and exclusively incurred for business purposes. This includes equipment, software subscriptions, internet costs, co-working space fees, professional development, and travel for business. Keep receipts and records of all expenses.',
    },
    {
        id: 'free-faq-3',
        question: 'Should I register a company as a freelancer?',
        answer: 'It depends on your income level and goals. Operating as a sole proprietor means you pay PIT (up to 25%). Registering a limited liability company means profits are subject to CIT instead. Small companies with turnover under ₦50M pay 0% CIT, which can be advantageous. However, companies have additional compliance requirements (annual returns, audit requirements, etc.).',
    },
    {
        id: 'free-faq-4',
        question: 'What if I earn income from foreign clients?',
        answer: 'Nigerian residents are taxed on worldwide income. Income earned from foreign clients is taxable in Nigeria. However, you may be able to claim relief under double taxation agreements (DTAs) Nigeria has with certain countries, to avoid being taxed twice on the same income.',
    },
    {
        id: 'free-faq-5',
        question: 'How often should freelancers pay tax?',
        answer: 'Freelancers under direct assessment should file an annual return by March 31st of the following year. However, you may be required to make advance payments (provisional tax) based on your estimated income for the year. Setting aside a percentage of each invoice for tax is a good practice.',
    },
];

const FreelancerTaxGuide: FC = () => (
    <GuideLayout
        title="How Freelancers Pay Tax in Nigeria: A Complete Guide"
        description="Everything freelancers and self-employed professionals need to know about paying tax in Nigeria — registration, tax rates, allowable deductions, and filing requirements."
        canonical="https://claryeo.com/guides/freelancer-tax-nigeria"
        keywords="freelancer tax Nigeria, self-employed tax Nigeria, personal income tax Nigeria, freelance tax guide, PIT Nigeria, direct assessment Nigeria"
        publishedDate="2026-04-06"
        modifiedDate="2026-04-06"
        breadcrumbTitle="Freelancer Tax Guide"
        structuredData={buildFaqSchema(
            faqs.map((f) => ({ question: f.question, answer: f.answer })),
        )}
    >
        <h1 className="t-display-2">
            How Freelancers Pay Tax in Nigeria
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
            Updated April 2026 &middot; 7 min read
        </p>

        <p className="t-body mt-6 text-muted-foreground">
            If you earn income as a freelancer, consultant, or self-employed
            professional in Nigeria, you are legally required to pay tax. Unlike
            employees whose tax is deducted through{' '}
            <a
                href="/guides/paye-tax-nigeria"
                className="font-medium text-primary hover:underline"
            >
                PAYE
            </a>
            , freelancers must handle their own tax registration, calculation,
            and filing. This guide walks you through the process step by step.
        </p>

        <h2 className="t-display-3 mt-10">
            PIT vs CIT: Which Tax Do Freelancers Pay?
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            The tax you pay depends on your business structure:
        </p>
        <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-semibold">
                            Structure
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            Tax Type
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            Rate
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            Filed With
                        </th>
                    </tr>
                </thead>
                <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">
                            Sole proprietor / Individual
                        </td>
                        <td className="px-4 py-3">PIT</td>
                        <td className="px-4 py-3">0% – 25% (progressive)</td>
                        <td className="px-4 py-3">State IRS</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3">Limited liability company</td>
                        <td className="px-4 py-3">CIT</td>
                        <td className="px-4 py-3">0% / 20% / 30%</td>
                        <td className="px-4 py-3">FIRS</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p className="t-body mt-4 text-muted-foreground">
            Most freelancers start as sole proprietors and pay PIT through{' '}
            <strong className="text-foreground">direct assessment</strong>{' '}
            (self-filing). If your annual income grows beyond ₦50 million, or
            you want liability protection, registering a company may offer tax
            advantages — see our{' '}
            <a
                href="/guides/small-business-tax-nigeria"
                className="font-medium text-primary hover:underline"
            >
                small business tax guide
            </a>{' '}
            for details.
        </p>

        <h2 className="t-display-3 mt-10">
            Step 1: Register With Your Tax Authority
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            Before you can file taxes, you need a Tax Identification Number
            (TIN). As a freelancer, register with the{' '}
            <strong className="text-foreground">
                State Internal Revenue Service (SIRS)
            </strong>{' '}
            of the state where you reside. You will need:
        </p>
        <ul className="mt-4 space-y-2 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    Valid government-issued ID (NIN, driver's licence, or
                    passport)
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Proof of address (utility bill or bank statement)</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    Business name registration certificate (if applicable)
                </span>
            </li>
        </ul>

        <h2 className="t-display-3 mt-10">
            Step 2: Track Your Income and Expenses
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            Accurate record-keeping is essential. You need to track:
        </p>
        <ul className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">All income:</strong>{' '}
                    Every payment received from clients, both local and
                    international.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Business expenses:
                    </strong>{' '}
                    Equipment, software, internet, co-working fees, travel, and
                    professional development.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">Invoices:</strong> Keep
                    copies of all invoices sent and payments received.
                </span>
            </li>
        </ul>

        <GuideCta
            heading="Track income and expenses effortlessly"
            description="Claryeo syncs your transactions, tracks expenses, and generates tax summaries automatically."
            buttonText="Join the waitlist"
            buttonHref="/waitlist"
        />

        <h2 className="t-display-3 mt-10">Step 3: Calculate Your Tax</h2>
        <p className="t-body mt-3 text-muted-foreground">
            As a sole proprietor, your tax is calculated the same way as PAYE
            employees — using the progressive PIT bands after deducting the
            Consolidated Relief Allowance (CRA) and other eligible reliefs.
        </p>
        <p className="t-body mt-3 text-muted-foreground">
            The key difference is that you calculate and pay it yourself, rather
            than having an employer do it for you. The progressive bands range
            from 0% on the first ₦800,000 of taxable income up to 25% on income
            above ₦50,000,000.
        </p>

        <GuideCta />

        <h2 className="t-display-3 mt-10">
            Allowable Deductions for Freelancers
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            You can reduce your taxable income by claiming business expenses.
            Common deductions for freelancers include:
        </p>
        <ul className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">Equipment:</strong>{' '}
                    Laptops, phones, cameras, and other work tools.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">Software:</strong>{' '}
                    Design tools, development tools, project management,
                    accounting software.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Internet and phone:
                    </strong>{' '}
                    Business portion of internet and mobile phone bills.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Workspace costs:
                    </strong>{' '}
                    Co-working memberships or home office expenses.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Professional development:
                    </strong>{' '}
                    Courses, certifications, and conferences related to your
                    work.
                </span>
            </li>
        </ul>

        <h2 className="t-display-3 mt-10">Step 4: File Your Return</h2>
        <p className="t-body mt-3 text-muted-foreground">
            Freelancers file annual tax returns by{' '}
            <strong className="text-foreground">March 31st</strong> of the
            following year. You file with your State Internal Revenue Service
            using Form A (self-assessment).
        </p>
        <p className="t-body mt-3 text-muted-foreground">
            What you need to file:
        </p>
        <ul className="mt-4 space-y-2 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Summary of total income for the year</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>List of allowable expenses and deductions</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Proof of any advance tax payments made</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Your TIN</span>
            </li>
        </ul>

        <h2 className="t-display-3 mt-10">
            Tips for Managing Tax as a Freelancer
        </h2>
        <ul className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Set aside 20-25% of each invoice
                    </strong>{' '}
                    for tax. This prevents a large surprise bill at year-end.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Keep receipts for everything.
                    </strong>{' '}
                    Digital copies are acceptable. The more deductions you can
                    prove, the less tax you pay.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Use professional invoices.
                    </strong>{' '}
                    Proper{' '}
                    <a
                        href="/guides/invoice-guide-nigeria"
                        className="font-medium text-primary hover:underline"
                    >
                        invoicing
                    </a>{' '}
                    creates a clear audit trail and builds client trust.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Separate personal and business finances.
                    </strong>{' '}
                    A dedicated business account makes tracking much easier.
                </span>
            </li>
        </ul>

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
                    href="/guides/paye-tax-nigeria"
                    className="text-primary hover:underline"
                >
                    PAYE Tax in Nigeria: Complete Guide
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
                    href="/guides/invoice-guide-nigeria"
                    className="text-primary hover:underline"
                >
                    How to Create Professional Invoices in Nigeria
                </a>
            </li>
        </ul>
    </GuideLayout>
);

export default FreelancerTaxGuide;
