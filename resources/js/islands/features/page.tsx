import {
    Activity,
    BarChart3,
    Receipt,
    RefreshCw,
    Sparkles,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';
import type { FC } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Features: FC = () => (
    <>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <section className="border-b border-border bg-muted/20 py-12 transition-colors duration-300 md:py-16">
                <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Everything you need to run your business
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        An AI-powered experience across the app—automatic bank
                        sync, realtime tracking, invoicing, expenses, tax
                        summaries, insights, and analytics—without long forms or
                        complexity. Rolling out in Nigeria first.
                    </p>
                </div>
            </section>

            <section className="border-border bg-muted/25 py-16 transition-colors duration-300 md:py-24 dark:bg-muted/20">
                <div className="mx-auto max-w-5xl px-4 md:px-6">
                    <div className="grid gap-2 sm:grid-cols-5">
                        {/* Top-left: Invoicing & AI-powered experience (3 cols) */}
                        <Card className="group overflow-hidden border-border bg-card shadow-sm transition-colors duration-300 sm:col-span-3 sm:rounded-none sm:rounded-tl-xl dark:border-border dark:bg-card">
                            <CardHeader className="border-none">
                                <div className="p-4 md:p-6">
                                    <p className="font-medium text-foreground">
                                        Invoicing & AI across the app
                                    </p>
                                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                                        Create professional invoices in minutes.
                                        AI helps everywhere—from drafting line
                                        items and receipts to insights,
                                        analytics, and transaction analysis—so
                                        you spend less time on admin. Fixed or
                                        variable pricing, VAT, discounts, and
                                        payment terms.
                                    </p>
                                </div>
                            </CardHeader>
                            <div className="relative h-fit overflow-hidden pl-4 md:pl-6">
                                <div className="overflow-hidden rounded-tl-lg border-t border-l border-border bg-card pt-2 pl-2 dark:bg-muted/30">
                                    <div className="flex aspect-video min-h-[200px] items-center justify-center bg-linear-to-br from-primary/5 to-transparent p-6 dark:from-primary/10">
                                        {/* Placeholder illustration; replace with <img src="/invoicing.png" alt="Invoicing" className="h-full w-full object-contain object-left" /> when you have an image */}
                                        <svg
                                            className="h-full w-full max-w-md object-contain object-left text-primary/70 dark:text-primary/60"
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
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Top-right: Tax & reports (2 cols) */}
                        <Card className="group overflow-hidden border-border bg-card shadow-sm transition-colors duration-300 sm:col-span-2 sm:rounded-none sm:rounded-tr-xl dark:border-border dark:bg-card">
                            <p className="mx-auto my-6 max-w-md px-4 text-center text-lg font-semibold text-balance text-foreground sm:text-xl md:p-6">
                                Tax summaries and reports, export-ready. PIT,
                                CIT & VAT by period. Export to PDF or CSV.
                            </p>
                            <CardContent className="mt-auto h-fit border-none pt-0">
                                <div className="relative max-sm:mb-4">
                                    <div className="aspect-4/3 overflow-hidden rounded-r-lg border border-border">
                                        <div className="flex h-full min-h-[180px] items-center justify-center bg-linear-to-br from-primary/5 to-transparent p-4 dark:from-primary/10">
                                            {/* Placeholder illustration; replace with <img src="/tax-reports.png" alt="Tax and reports" className="h-full w-full object-contain" /> when you have an image */}
                                            <svg
                                                className="h-full w-full max-w-xs object-contain text-primary/70 dark:text-primary/60"
                                                viewBox="0 0 280 210"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden
                                            >
                                                <rect
                                                    x="20"
                                                    y="20"
                                                    width="240"
                                                    height="170"
                                                    rx="8"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    fill="var(--color-card)"
                                                />
                                                <path
                                                    d="M40 150 L80 110 L120 130 L160 80 L200 100 L240 60"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    strokeOpacity="0.9"
                                                />
                                                <line
                                                    x1="40"
                                                    y1="170"
                                                    x2="240"
                                                    y2="170"
                                                    stroke="currentColor"
                                                    strokeWidth="1"
                                                    strokeOpacity="0.5"
                                                />
                                                <line
                                                    x1="60"
                                                    y1="170"
                                                    x2="60"
                                                    y2="150"
                                                    stroke="currentColor"
                                                    strokeWidth="1"
                                                    strokeOpacity="0.4"
                                                />
                                                <line
                                                    x1="140"
                                                    y1="170"
                                                    x2="140"
                                                    y2="150"
                                                    stroke="currentColor"
                                                    strokeWidth="1"
                                                    strokeOpacity="0.4"
                                                />
                                                <line
                                                    x1="220"
                                                    y1="170"
                                                    x2="220"
                                                    y2="150"
                                                    stroke="currentColor"
                                                    strokeWidth="1"
                                                    strokeOpacity="0.4"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bottom-left: Simple management (2 cols) */}
                        <Card className="group border-border bg-card p-6 shadow-sm transition-colors duration-300 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl md:p-10 dark:border-border dark:bg-card">
                            <p className="mx-auto mb-8 max-w-md text-center text-lg font-semibold text-balance text-foreground sm:text-xl">
                                Less admin, more focus. Short flows and smart
                                defaults—no lengthy forms.
                            </p>
                            <div className="flex justify-center gap-6">
                                <div className="flex aspect-square size-16 flex-col items-center justify-center rounded-xl border border-border bg-muted/40 p-3 shadow-sm transition-colors duration-300 dark:bg-muted/30">
                                    <Zap className="size-6 text-primary" />
                                    <span className="mt-1 text-[10px] font-medium text-muted-foreground">
                                        Quick
                                    </span>
                                </div>
                                <div className="flex aspect-square size-16 flex-col items-center justify-center rounded-xl border border-border bg-muted/40 p-3 shadow-sm transition-colors duration-300 dark:bg-muted/30">
                                    <Sparkles className="size-6 text-primary" />
                                    <span className="mt-1 text-[10px] font-medium text-muted-foreground">
                                        AI
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Bottom-right: Expenses, clients, bank sync, realtime, insights (3 cols) */}
                        <Card className="group relative border-border bg-card shadow-sm transition-colors duration-300 sm:col-span-3 sm:rounded-none sm:rounded-br-xl dark:border-border dark:bg-card">
                            <CardHeader className="border-none p-4 md:p-6">
                                <p className="font-medium text-foreground">
                                    Expenses, clients, bank sync & realtime
                                </p>
                                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                                    Bank transactions sync automatically—no
                                    manual entry or statement uploads. Realtime
                                    account tracking and analysis. Track
                                    expenses, manage clients, and see spending
                                    at a glance. Notifications when payments
                                    land or deadlines approach.
                                </p>
                            </CardHeader>
                            <CardContent className="relative h-fit border-none px-4 pb-4 md:px-6 md:pb-6">
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                                    {[
                                        { icon: RefreshCw, label: 'Bank sync' },
                                        { icon: Activity, label: 'Realtime' },
                                        { icon: Receipt, label: 'Expenses' },
                                        { icon: Users, label: 'Clients' },
                                        { icon: TrendingUp, label: 'Insights' },
                                        { icon: BarChart3, label: 'Reports' },
                                    ].map(({ icon: Icon, label }) => (
                                        <div
                                            key={label}
                                            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted/30 p-4 transition-colors duration-300 dark:bg-muted/20"
                                        >
                                            <Icon className="size-6 text-primary" />
                                            <span className="text-center text-xs font-medium whitespace-nowrap text-foreground">
                                                {label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="border-t border-border bg-background py-12 transition-colors duration-300 md:py-16">
                <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
                    <p className="text-xl font-semibold text-balance text-foreground md:text-2xl">
                        Smart tools and simple flows so you can focus on your
                        business.
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                        Nigeria first · More regions coming soon
                    </p>
                </div>
            </section>
        </div>
    </>
);

export default Features;
