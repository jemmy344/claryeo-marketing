import type { FC } from 'react';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const taxCalculatorFaqData = [
    {
        id: 'faq-1',
        question: 'How is PAYE calculated in Nigeria?',
        answer: 'PAYE (Pay-As-You-Earn) is calculated by first deducting the Consolidated Relief Allowance (CRA) and other eligible reliefs from your gross income to arrive at taxable income. The taxable income is then applied across progressive tax bands ranging from 0% on the first ₦800,000 up to 25% on income above ₦50,000,000. Your employer deducts and remits PAYE monthly on your behalf.',
    },
    {
        id: 'faq-2',
        question: 'What is Consolidated Relief Allowance (CRA)?',
        answer: 'The CRA is a tax relief available to all Nigerian taxpayers. It is calculated as the higher of ₦200,000 or 1% of your gross income, plus 20% of your gross income. This amount is deducted from your gross income before applying tax bands, effectively reducing how much tax you pay.',
    },
    {
        id: 'faq-3',
        question: 'What is the CIT rate for small companies in Nigeria?',
        answer: 'Small companies with annual turnover of ₦50,000,000 or less and fixed assets of ₦250,000,000 or less pay 0% CIT. Medium companies (turnover between ₦50M and ₦100M) pay 20%, while large companies (turnover above ₦100M) pay 30%. Professional service companies do not qualify for the small company 0% exemption.',
    },
    {
        id: 'faq-4',
        question: 'Do freelancers pay PAYE or CIT in Nigeria?',
        answer: 'Freelancers and self-employed individuals pay Personal Income Tax (PIT) using the same progressive bands as PAYE employees. However, unlike employees whose tax is deducted by employers, freelancers must file and pay directly with their state tax authority. If you register a limited liability company, your business profits are subject to CIT instead.',
    },
    {
        id: 'faq-5',
        question: 'When are tax returns due in Nigeria?',
        answer: 'For individuals (including freelancers), the annual tax return is due by March 31st of the following year. Companies must file their CIT returns within 6 months of their accounting year-end (or 18 months for newly incorporated companies filing for the first time). Late filing attracts penalties and interest charges.',
    },
    {
        id: 'faq-6',
        question: 'What deductions can I claim to reduce my tax?',
        answer: 'You can claim the Consolidated Relief Allowance (CRA), pension contributions (typically 8% of basic, housing, and transport), National Housing Fund (2.5% of basic salary), life insurance premiums, and the National Health Insurance Scheme (NHIS) contributions. For businesses, allowable deductions include operating expenses, depreciation, and capital allowances on qualifying assets.',
    },
    {
        id: 'faq-7',
        question: 'What is the current VAT rate in Nigeria?',
        answer: 'The current VAT rate in Nigeria is 7.5%, introduced in February 2020 (up from the previous 5%). VAT applies to most goods and services, though certain items like basic food, medical supplies, and educational materials are VAT-exempt. Businesses with annual turnover above ₦25 million must register for VAT.',
    },
    {
        id: 'faq-8',
        question: 'Am I exempt from PAYE if I earn minimum wage?',
        answer: 'Yes. Employees earning at or below the national minimum wage of ₦70,000 per month (₦840,000 annually) are exempt from PAYE. This exemption was introduced to reduce the tax burden on low-income earners in Nigeria.',
    },
];

const TaxCalculatorFaqs: FC = () => (
    <section className="mx-auto mt-16 max-w-4xl px-4">
        <h2 className="text-2xl font-bold md:text-3xl">
            Frequently Asked Questions
        </h2>
        <p className="mt-2 text-muted-foreground">
            Common questions about tax calculation in Nigeria.
        </p>

        <div className="mt-8">
            <Accordion
                type="single"
                collapsible
                className="w-full rounded-2xl bg-muted p-1 dark:bg-muted/50"
            >
                {taxCalculatorFaqData.map((item) => (
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
    </section>
);

export default TaxCalculatorFaqs;
