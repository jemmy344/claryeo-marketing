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
        id: 'paye-faq-1',
        question: 'Who is required to pay PAYE in Nigeria?',
        answer: 'Every employee in Nigeria earning above the national minimum wage of ₦70,000 per month (₦840,000 annually) is subject to PAYE. Employers are responsible for deducting and remitting PAYE on behalf of their employees to the relevant State Internal Revenue Service (SIRS).',
    },
    {
        id: 'paye-faq-2',
        question: 'How is the Consolidated Relief Allowance calculated?',
        answer: 'The CRA is the higher of ₦200,000 or 1% of gross income, plus 20% of gross income. For example, if your gross annual income is ₦5,000,000: CRA = max(₦200,000, ₦50,000) + ₦1,000,000 = ₦1,200,000. This reduces your taxable income before tax bands are applied.',
    },
    {
        id: 'paye-faq-3',
        question: 'What happens if my employer does not deduct PAYE?',
        answer: 'Employers who fail to deduct and remit PAYE face penalties under the Personal Income Tax Act (PITA). As an employee, you may also be held liable if your employer fails to remit. It is advisable to confirm with your employer that PAYE is being properly deducted and remitted.',
    },
    {
        id: 'paye-faq-4',
        question: 'Can I get a PAYE refund if I overpaid?',
        answer: 'Yes. If you have overpaid PAYE (for example, due to not claiming all eligible reliefs), you can apply for a refund through your State Internal Revenue Service. You will need to provide your tax returns and evidence of overpayment.',
    },
    {
        id: 'paye-faq-5',
        question: 'Is PAYE the same as Personal Income Tax?',
        answer: 'PAYE is a method of collecting Personal Income Tax (PIT), not a separate tax. It applies specifically to employees whose employers deduct tax at source. Self-employed individuals pay PIT through direct assessment instead of PAYE.',
    },
];

const PayeTaxNigeriaGuide: FC = () => (
    <GuideLayout
        title="PAYE Tax in Nigeria: Complete Guide for Employees & Employers (2026)"
        description="Everything you need to know about PAYE tax in Nigeria: tax bands, CRA calculation, employer obligations, and filing deadlines. Updated for 2026."
        canonical="https://claryeo.com/guides/paye-tax-nigeria"
        keywords="PAYE tax Nigeria, PAYE calculator Nigeria, personal income tax Nigeria, tax bands Nigeria 2026, CRA Nigeria, how to calculate PAYE"
        publishedDate="2026-04-06"
        modifiedDate="2026-04-06"
        breadcrumbTitle="PAYE Tax Guide"
        structuredData={buildFaqSchema(
            faqs.map((f) => ({ question: f.question, answer: f.answer })),
        )}
    >
        <h1 className="t-display-2">
            PAYE Tax in Nigeria: Complete Guide for Employees &amp; Employers
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
            Updated April 2026 &middot; 8 min read
        </p>

        <p className="t-body mt-6 text-muted-foreground">
            Pay-As-You-Earn (PAYE) is the system through which employers deduct
            Personal Income Tax (PIT) from employee salaries and remit it to the
            relevant State Internal Revenue Service (SIRS). If you earn a salary
            in Nigeria, PAYE is how your tax gets paid. This guide covers
            everything you need to know, from how PAYE is calculated to your
            obligations as an employee or employer.
        </p>

        <h2 className="t-display-3 mt-10">What Is PAYE?</h2>
        <p className="t-body mt-3 text-muted-foreground">
            PAYE is not a separate tax. It is the collection mechanism for
            Personal Income Tax under the{' '}
            <strong className="text-foreground">
                Personal Income Tax Act (PITA)
            </strong>
            . Employers are legally required to deduct PIT from employees'
            salaries at source and remit it monthly. The tax authority
            responsible is the SIRS of the state where the employee resides.
        </p>
        <p className="t-body mt-3 text-muted-foreground">
            Self-employed individuals and freelancers do not pay through PAYE.
            Instead, they file under{' '}
            <a
                href="/guides/freelancer-tax-nigeria"
                className="font-medium text-primary hover:underline"
            >
                direct assessment
            </a>
            .
        </p>

        <h2 className="t-display-3 mt-10">Who Pays PAYE?</h2>
        <p className="t-body mt-3 text-muted-foreground">
            All employees earning above the national minimum wage are subject to
            PAYE. The current minimum wage is{' '}
            <strong className="text-foreground">₦70,000 per month</strong>{' '}
            (₦840,000 annually). Employees earning at or below this threshold
            are exempt from PAYE.
        </p>
        <p className="t-body mt-3 text-muted-foreground">
            Both Nigerian residents and non-residents earning income in Nigeria
            may be liable for PAYE. The key distinction is residency: residents
            are taxed on worldwide income, while non-residents are taxed only on
            Nigerian-sourced income.
        </p>

        <h2 className="t-display-3 mt-10">
            How PAYE Is Calculated: Step by Step
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            PAYE calculation involves three main steps:
        </p>
        <ol className="mt-4 space-y-4 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    1.
                </span>
                <span>
                    <strong className="text-foreground">
                        Determine gross income:
                    </strong>{' '}
                    Add up all employment income including basic salary, housing
                    allowance, transport allowance, bonuses, and any other
                    benefits.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    2.
                </span>
                <span>
                    <strong className="text-foreground">
                        Deduct reliefs and allowances:
                    </strong>{' '}
                    Subtract the Consolidated Relief Allowance (CRA), pension
                    contributions, NHF, NHIS, and any other eligible reliefs to
                    arrive at taxable income.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="shrink-0 font-semibold text-foreground">
                    3.
                </span>
                <span>
                    <strong className="text-foreground">
                        Apply progressive tax bands:
                    </strong>{' '}
                    Your taxable income is split across the graduated bands and
                    taxed at each band's rate.
                </span>
            </li>
        </ol>

        <h2 className="t-display-3 mt-10">
            PAYE Tax Bands in Nigeria (2026)
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            Nigeria's PIT uses a progressive (graduated) structure. After
            deducting reliefs, your taxable income is applied to these bands:
        </p>
        <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-semibold">
                            Band
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            Taxable Income (₦)
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            Rate
                        </th>
                    </tr>
                </thead>
                <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">1</td>
                        <td className="px-4 py-3">First 800,000</td>
                        <td className="px-4 py-3">0%</td>
                    </tr>
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">2</td>
                        <td className="px-4 py-3">Next 2,200,000</td>
                        <td className="px-4 py-3">15%</td>
                    </tr>
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">3</td>
                        <td className="px-4 py-3">Next 9,000,000</td>
                        <td className="px-4 py-3">18%</td>
                    </tr>
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">4</td>
                        <td className="px-4 py-3">Next 13,000,000</td>
                        <td className="px-4 py-3">21%</td>
                    </tr>
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">5</td>
                        <td className="px-4 py-3">Next 25,000,000</td>
                        <td className="px-4 py-3">23%</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3">6</td>
                        <td className="px-4 py-3">Above 50,000,000</td>
                        <td className="px-4 py-3">25%</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <GuideCta />

        <h2 className="t-display-3 mt-10">
            Consolidated Relief Allowance (CRA)
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            The CRA is available to all Nigerian taxpayers and significantly
            reduces taxable income. It is calculated as:
        </p>
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
            <p className="t-mono text-sm">
                CRA = max(₦200,000, 1% of Gross Income) + 20% of Gross Income
            </p>
        </div>
        <p className="t-body mt-4 text-muted-foreground">
            <strong className="text-foreground">Example:</strong> For an
            employee earning ₦6,000,000 annually:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>
                1% of ₦6,000,000 = ₦60,000 (₦200,000 is higher, so use ₦200,000)
            </li>
            <li>20% of ₦6,000,000 = ₦1,200,000</li>
            <li>CRA = ₦200,000 + ₦1,200,000 = ₦1,400,000</li>
            <li>Taxable income = ₦6,000,000 − ₦1,400,000 = ₦4,600,000</li>
        </ul>

        <h2 className="t-display-3 mt-10">Other Tax Reliefs</h2>
        <p className="t-body mt-3 text-muted-foreground">
            In addition to CRA, employees can claim the following deductions:
        </p>
        <ul className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Pension contribution:
                    </strong>{' '}
                    Employee's 8% contribution to their Retirement Savings
                    Account (RSA) is tax-exempt under the Pension Reform Act
                    2014.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        National Housing Fund (NHF):
                    </strong>{' '}
                    2.5% of basic salary for employees earning above the minimum
                    wage.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Life insurance premiums:
                    </strong>{' '}
                    Premiums on life insurance policies are deductible from
                    gross income.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        NHIS contributions:
                    </strong>{' '}
                    National Health Insurance Scheme contributions may also be
                    deducted.
                </span>
            </li>
        </ul>

        <h2 className="t-display-3 mt-10">Employer Obligations</h2>
        <p className="t-body mt-3 text-muted-foreground">
            Employers in Nigeria have several legal obligations related to PAYE:
        </p>
        <ul className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Monthly deduction and remittance:
                    </strong>{' '}
                    Deduct PAYE from employee salaries and remit to the relevant
                    SIRS by the 10th of the following month.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">Annual returns:</strong>{' '}
                    File annual PAYE returns by January 31st of the following
                    year, listing all employees and their tax deductions.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Employee notification:
                    </strong>{' '}
                    Provide employees with their tax deduction certificates
                    showing total PAYE deducted during the year.
                </span>
            </li>
        </ul>

        <h2 className="t-display-3 mt-10">
            Filing Deadlines and Penalties
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            Individual taxpayers must file their annual returns by{' '}
            <strong className="text-foreground">March 31st</strong> of the
            following year. Employers must file annual PAYE returns by{' '}
            <strong className="text-foreground">January 31st</strong>.
        </p>
        <p className="t-body mt-3 text-muted-foreground">
            Late filing attracts penalties including fines and interest on
            unpaid tax. In severe cases, the tax authority may pursue criminal
            prosecution. Staying on top of deadlines is essential for
            compliance.
        </p>

        <GuideCta
            heading="Track your income and tax automatically"
            description="Claryeo calculates your tax from invoices and expenses. No spreadsheets needed."
            buttonText="Join the waitlist"
            buttonHref="/waitlist"
        />

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
                    href="/guides/invoice-guide-nigeria"
                    className="text-primary hover:underline"
                >
                    How to Create Professional Invoices in Nigeria
                </a>
            </li>
        </ul>
    </GuideLayout>
);

export default PayeTaxNigeriaGuide;
