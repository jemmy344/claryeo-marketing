import type { FC } from 'react';

import { FaqAccordion } from '@/components/faq';
import GuideCta from '@/components/guide-cta';
import GuideLayout from '@/components/guide-layout';
import { smallBusinessGuideFaqs } from '@/lib/faqs';
import { buildFaqSchema } from '@/lib/structured-data';


const SmallBusinessTaxGuide: FC = () => (
    <GuideLayout
        title="Small Business Tax in Nigeria: What You Need to Know (2026)"
        description="A complete guide to CIT, VAT, TIN registration, and tax filing for small businesses in Nigeria. Learn the rates, deadlines, and deductions that apply to your company."
        canonical="https://claryeo.com/guides/small-business-tax-nigeria"
        keywords="small business tax Nigeria, CIT rates Nigeria, company income tax Nigeria, VAT registration Nigeria, TIN Nigeria, business tax guide"
        publishedDate="2026-04-06"
        modifiedDate="2026-04-06"
        breadcrumbTitle="Business Tax Guide"
        structuredData={buildFaqSchema(smallBusinessGuideFaqs)}
    >
        <h1 className="t-display-2">
            Small Business Tax in Nigeria: What You Need to Know
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
            Updated April 2026 &middot; 7 min read
        </p>

        <p className="t-body mt-6 text-muted-foreground">
            Running a business in Nigeria comes with tax obligations that vary
            based on your company size, structure, and industry. Understanding
            these obligations early helps you stay compliant, avoid penalties,
            and even save money through legitimate deductions. This guide covers
            the key taxes that affect small and medium businesses in Nigeria.
        </p>

        <h2 className="t-display-3 mt-10">Company Income Tax (CIT)</h2>
        <p className="t-body mt-3 text-muted-foreground">
            CIT is the primary tax on company profits in Nigeria, administered
            by the{' '}
            <strong className="text-foreground">
                Federal Inland Revenue Service (FIRS)
            </strong>
            . The rate depends on your company's annual turnover:
        </p>
        <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-semibold">
                            Company Size
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            Annual Turnover
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            CIT Rate
                        </th>
                    </tr>
                </thead>
                <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">Small</td>
                        <td className="px-4 py-3">
                            ≤ ₦50,000,000 (fixed assets ≤ ₦250M)
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                            0%
                        </td>
                    </tr>
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">Medium</td>
                        <td className="px-4 py-3">₦50M – ₦100M</td>
                        <td className="px-4 py-3 font-medium text-foreground">
                            20%
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3">Large</td>
                        <td className="px-4 py-3">&gt; ₦100M</td>
                        <td className="px-4 py-3 font-medium text-foreground">
                            30%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
            Professional service companies (consulting, legal, accounting, etc.)
            do not qualify for the 0% small company exemption regardless of
            turnover.
        </p>

        <h2 className="t-display-3 mt-10">Value Added Tax (VAT)</h2>
        <p className="t-body mt-3 text-muted-foreground">
            VAT is a consumption tax charged at{' '}
            <strong className="text-foreground">7.5%</strong> on most goods and
            services in Nigeria. Businesses with annual turnover above ₦25
            million must register for VAT with FIRS.
        </p>
        <p className="t-body mt-3 text-muted-foreground">
            Key points about VAT:
        </p>
        <ul className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    VAT returns are filed monthly, by the 21st of the following
                    month.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    Input VAT (VAT paid on business purchases) can be offset
                    against output VAT (VAT collected from customers).
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    Certain items are VAT-exempt: basic food, medical supplies,
                    educational materials, and exported goods.
                </span>
            </li>
        </ul>

        <GuideCta />

        <h2 className="t-display-3 mt-10">
            Tax Identification Number (TIN)
        </h2>
        <p className="t-body mt-3 text-muted-foreground">
            Every business operating in Nigeria needs a TIN. It is required for:
        </p>
        <ul className="mt-4 space-y-2 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Filing tax returns</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Opening business bank accounts</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Bidding on government contracts</span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>Importing and exporting goods</span>
            </li>
        </ul>
        <p className="t-body mt-4 text-muted-foreground">
            You can register for a TIN through the FIRS Joint Tax Board (JTB)
            portal or at your nearest FIRS office. You will need your CAC
            registration certificate, memorandum of association, utility bill,
            and valid identification.
        </p>

        <h2 className="t-display-3 mt-10">Allowable Deductions</h2>
        <p className="t-body mt-3 text-muted-foreground">
            Businesses can reduce their taxable profit by claiming legitimate
            business expenses. Common allowable deductions include:
        </p>
        <ul className="mt-4 space-y-3 text-base text-muted-foreground">
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Operating expenses:
                    </strong>{' '}
                    Rent, utilities, office supplies, internet, and
                    telecommunications.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">Staff costs:</strong>{' '}
                    Salaries, wages, pension contributions, and staff welfare.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Professional fees:
                    </strong>{' '}
                    Legal, accounting, and consulting fees.
                </span>
            </li>
            <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                    <strong className="text-foreground">
                        Capital allowances:
                    </strong>{' '}
                    Depreciation on qualifying assets (machinery, vehicles,
                    equipment, buildings).
                </span>
            </li>
        </ul>

        <h2 className="t-display-3 mt-10">Filing Deadlines</h2>
        <p className="t-body mt-3 text-muted-foreground">
            Missing filing deadlines results in penalties and interest. Key
            deadlines for businesses:
        </p>
        <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-semibold">
                            Tax
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            Deadline
                        </th>
                    </tr>
                </thead>
                <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">CIT returns</td>
                        <td className="px-4 py-3">
                            6 months after accounting year-end
                        </td>
                    </tr>
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">VAT returns</td>
                        <td className="px-4 py-3">
                            21st of the following month
                        </td>
                    </tr>
                    <tr className="border-b border-border/50">
                        <td className="px-4 py-3">PAYE remittance</td>
                        <td className="px-4 py-3">
                            10th of the following month
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-3">WHT remittance</td>
                        <td className="px-4 py-3">
                            21st of the following month
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <GuideCta
            heading="Track expenses and tax automatically"
            description="Claryeo handles invoicing, expense tracking, and tax summaries, so you can focus on growing your business."
            buttonText="Join the waitlist"
            buttonHref="/waitlist"
        />

        <h2 className="t-display-3 mt-10">Frequently Asked Questions</h2>
        <FaqAccordion items={smallBusinessGuideFaqs} className="mt-6" />

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
                    href="/guides/freelancer-tax-nigeria"
                    className="text-primary hover:underline"
                >
                    How Freelancers Pay Tax in Nigeria
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

export default SmallBusinessTaxGuide;
