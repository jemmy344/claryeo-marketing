import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    BarChart3,
    ChevronDown,
    Database,
    FileText,
    Receipt,
    RefreshCw,
    Sparkles,
} from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

type FeatureKey =
    | 'item-1'
    | 'item-2'
    | 'item-3'
    | 'item-4'
    | 'item-5'
    | 'item-6'
    | 'item-7';

const IllustrationInvoicing: FC<{ className?: string }> = ({ className }) => (
    <svg
        className={cn(
            'h-full w-full object-contain object-left text-primary/70 dark:text-primary/60',
            className,
        )}
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <rect
            x="24"
            y="16"
            width="280"
            height="200"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="var(--color-card)"
        />
        <line
            x1="40"
            y1="48"
            x2="200"
            y2="48"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.6"
        />
        <line
            x1="40"
            y1="72"
            x2="240"
            y2="72"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.5"
        />
        <line
            x1="40"
            y1="96"
            x2="180"
            y2="96"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.4"
        />
        <line
            x1="40"
            y1="120"
            x2="220"
            y2="120"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.35"
        />
        <rect
            x="40"
            y="160"
            width="80"
            height="32"
            rx="6"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <circle
            cx="340"
            cy="60"
            r="28"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M328 60l8 8 16-16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    </svg>
);

const IllustrationAI: FC<{ className?: string }> = ({ className }) => (
    <svg
        className={cn(
            'h-full w-full object-contain object-center text-primary/70 dark:text-primary/60',
            className,
        )}
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <circle
            cx="200"
            cy="100"
            r="56"
            stroke="currentColor"
            strokeWidth="2"
            fill="var(--color-card)"
            strokeOpacity="0.9"
        />
        <path
            d="M176 92l12 12 24-24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        <circle
            cx="120"
            cy="180"
            r="20"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <circle
            cx="200"
            cy="180"
            r="20"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <circle
            cx="280"
            cy="180"
            r="20"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <path
            d="M80 140 Q120 100 160 120"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            fill="none"
        />
        <path
            d="M320 140 Q280 100 240 120"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            fill="none"
        />
    </svg>
);

const IllustrationExpenses: FC<{ className?: string }> = ({ className }) => (
    <svg
        className={cn(
            'h-full w-full object-contain object-left text-primary/70 dark:text-primary/60',
            className,
        )}
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <rect
            x="32"
            y="24"
            width="336"
            height="192"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="var(--color-card)"
        />
        <line
            x1="48"
            y1="56"
            x2="352"
            y2="56"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
        />
        <rect
            x="48"
            y="72"
            width="48"
            height="32"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.5"
        />
        <line
            x1="108"
            y1="88"
            x2="280"
            y2="88"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
        />
        <line
            x1="288"
            y1="88"
            x2="320"
            y2="88"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.7"
        />
        <rect
            x="48"
            y="116"
            width="48"
            height="32"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.5"
        />
        <line
            x1="108"
            y1="132"
            x2="260"
            y2="132"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
        />
        <line
            x1="268"
            y1="132"
            x2="320"
            y2="132"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.7"
        />
        <rect
            x="48"
            y="160"
            width="48"
            height="32"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.5"
        />
        <line
            x1="108"
            y1="176"
            x2="240"
            y2="176"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
        />
        <line
            x1="248"
            y1="176"
            x2="320"
            y2="176"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.7"
        />
    </svg>
);

const IllustrationTax: FC<{ className?: string }> = ({ className }) => (
    <svg
        className={cn(
            'h-full w-full object-contain object-center text-primary/70 dark:text-primary/60',
            className,
        )}
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <rect
            x="40"
            y="24"
            width="320"
            height="192"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="var(--color-card)"
        />
        <path
            d="M60 160 L100 100 L140 130 L180 80 L220 120 L260 70 L300 100 L340 60"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeOpacity="0.9"
        />
        <line
            x1="60"
            y1="192"
            x2="360"
            y2="192"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
        />
        <line
            x1="80"
            y1="192"
            x2="80"
            y2="160"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
        />
        <line
            x1="200"
            y1="192"
            x2="200"
            y2="160"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
        />
        <line
            x1="340"
            y1="192"
            x2="340"
            y2="160"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
        />
        <rect
            x="60"
            y="56"
            width="120"
            height="24"
            rx="4"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
        />
    </svg>
);

const IllustrationReports: FC<{ className?: string }> = ({ className }) => (
    <svg
        className={cn(
            'h-full w-full object-contain object-center text-primary/70 dark:text-primary/60',
            className,
        )}
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <rect
            x="32"
            y="24"
            width="336"
            height="192"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="var(--color-card)"
        />
        <rect
            x="64"
            y="120"
            width="48"
            height="80"
            rx="4"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.6"
        />
        <rect
            x="136"
            y="80"
            width="48"
            height="120"
            rx="4"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.6"
        />
        <rect
            x="208"
            y="100"
            width="48"
            height="100"
            rx="4"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.6"
        />
        <rect
            x="280"
            y="60"
            width="48"
            height="140"
            rx="4"
            fill="currentColor"
            fillOpacity="0.35"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.8"
        />
        <line
            x1="48"
            y1="200"
            x2="352"
            y2="200"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
        />
    </svg>
);

const IllustrationBankSync: FC<{ className?: string }> = ({ className }) => (
    <svg
        className={cn(
            'h-full w-full object-contain object-center text-primary/70 dark:text-primary/60',
            className,
        )}
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <rect
            x="60"
            y="40"
            width="120"
            height="160"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="var(--color-card)"
        />
        <rect
            x="220"
            y="40"
            width="120"
            height="160"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="var(--color-card)"
        />
        <path
            d="M180 80 L200 120 L220 80"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeOpacity="0.8"
        />
        <path
            d="M220 160 L200 120 L180 160"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeOpacity="0.8"
        />
        <line
            x1="200"
            y1="56"
            x2="200"
            y2="184"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeDasharray="4 4"
        />
        <circle
            cx="100"
            cy="80"
            r="16"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="1.5"
        />
        <circle
            cx="300"
            cy="80"
            r="16"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
);

const IllustrationRealtime: FC<{ className?: string }> = ({ className }) => (
    <svg
        className={cn(
            'h-full w-full object-contain object-center text-primary/70 dark:text-primary/60',
            className,
        )}
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
    >
        <rect
            x="32"
            y="24"
            width="336"
            height="192"
            rx="8"
            stroke="currentColor"
            strokeWidth="2"
            fill="var(--color-card)"
        />
        <path
            d="M56 160 L96 120 L136 140 L176 90 L216 110 L256 70 L296 100 L336 80"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeOpacity="0.9"
        />
        <circle cx="336" cy="80" r="6" fill="currentColor" fillOpacity="0.8" />
        <line
            x1="56"
            y1="180"
            x2="344"
            y2="180"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
        />
        <rect
            x="56"
            y="56"
            width="80"
            height="20"
            rx="4"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
        />
    </svg>
);

const features: Array<{
    key: FeatureKey;
    icon: FC<{ className?: string }>;
    title: string;
    content: string;
    visual: string;
    illustration: ReactNode;
}> = [
    {
        key: 'item-1',
        icon: FileText,
        title: 'Professional Invoices',
        content:
            'Create and send professional invoices in minutes. Customize templates, track status, and get paid faster with Claryeo.',
        visual: 'Invoicing',
        illustration: <IllustrationInvoicing />,
    },
    {
        key: 'item-2',
        icon: Sparkles,
        title: 'AI-Powered Experience',
        content:
            'AI across the whole app: insights, analytics, and smart assistance. Create invoices and receipts, analyse transactions, and figure things out without the guesswork. Your number one business companion.',
        visual: 'AI',
        illustration: <IllustrationAI />,
    },
    {
        key: 'item-3',
        icon: Receipt,
        title: 'Expense Tracking',
        content:
            'Categorize and track every business expense. Stay on top of spending and keep records ready for tax time.',
        visual: 'Expenses',
        illustration: <IllustrationExpenses />,
    },
    {
        key: 'item-4',
        icon: Database,
        title: 'Tax-Ready Summaries',
        content:
            'PIT, CIT & VAT breakdowns by period. FIRS-oriented summaries for Nigeria. Rolling out in more regions soon.',
        visual: 'Tax',
        illustration: <IllustrationTax />,
    },
    {
        key: 'item-5',
        icon: BarChart3,
        title: 'Reports & Analytics',
        content:
            'Profit & loss, cash flow, and export to PDF or CSV. One dashboard for your business health.',
        visual: 'Reports',
        illustration: <IllustrationReports />,
    },
    {
        key: 'item-6',
        icon: RefreshCw,
        title: 'Bank transaction sync',
        content:
            'Automatic syncing of your transactions from your bank. No manual entry or statement uploads—connect once and your transactions flow in so you spend less time on data entry.',
        visual: 'Bank sync',
        illustration: <IllustrationBankSync />,
    },
    {
        key: 'item-7',
        icon: Activity,
        title: 'Realtime account tracking',
        content:
            'Realtime account tracking and analysis. See your cash flow, balances, and business health as they update—so you can make decisions with current data, not last month’s.',
        visual: 'Realtime',
        illustration: <IllustrationRealtime />,
    },
];

const LandingFeatures: FC = () => {
    const [activeItem, setActiveItem] = useState<FeatureKey>('item-1');

    return (
        <section className="py-12 transition-colors duration-300 md:py-20 lg:py-32">
            <div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/30 to-transparent sm:inset-6 sm:rounded-b-3xl dark:from-muted/10" />
            <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h2 className="text-4xl font-semibold text-balance text-foreground lg:text-6xl">
                        Your number one business companion
                    </h2>
                    <p className="text-muted-foreground">
                        An AI-powered experience across the app—bank sync,
                        realtime tracking, insights and analytics, invoices and
                        receipts, transaction analysis, and tax-ready summaries.
                        So you can focus on what matters.
                    </p>
                </div>

                <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
                    <div className="w-full space-y-2">
                        {features.map((feature) => (
                            <Collapsible
                                key={feature.key}
                                open={activeItem === feature.key}
                                onOpenChange={(open) =>
                                    open && setActiveItem(feature.key)
                                }
                            >
                                <CollapsibleTrigger
                                    className={cn(
                                        'group flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-muted/50',
                                        activeItem === feature.key &&
                                            'border-primary bg-primary/5 dark:bg-primary/10',
                                    )}
                                >
                                    <div className="flex items-center gap-2 text-base font-medium text-foreground">
                                        <feature.icon className="size-4 shrink-0" />
                                        {feature.title}
                                    </div>
                                    <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <p className="border-x border-b border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
                                        {feature.content}
                                    </p>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>

                    <div className="relative flex overflow-hidden rounded-3xl border border-border bg-card p-2 transition-colors duration-300">
                        <div className="aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted/30 dark:bg-muted/20">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeItem}
                                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative flex size-full flex-col rounded-xl border border-border bg-background/80 text-foreground"
                                >
                                    {(() => {
                                        const active = features.find(
                                            (f) => f.key === activeItem,
                                        );
                                        if (!active) return null;
                                        return (
                                            <>
                                                <div className="flex size-full min-h-0 flex-1 items-center justify-center p-6">
                                                    {active.illustration}
                                                </div>
                                                <div className="absolute inset-x-0 bottom-0 rounded-b-xl bg-linear-to-t from-background/95 to-transparent px-4 py-4">
                                                    <p className="text-sm font-medium text-foreground">
                                                        {active.title}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {active.visual}
                                                    </p>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingFeatures;
