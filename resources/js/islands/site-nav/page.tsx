import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import AppearanceToggle from '@/islands/appearance-toggle';
import { cn } from '@/lib/utils';

type NavLink = { label: string; href: string };
type ResourceColumn = { title: string; links: NavLink[] };
type SupportLink = { label: string; href: string; desc?: string };

type SiteNavProps = {
    appUrl?: string;
    primary?: NavLink[];
    resources?: {
        lead?: NavLink;
        columns?: ResourceColumn[];
        support?: SupportLink[];
    };
};

const linkClass =
    'text-sm text-muted-foreground transition-colors hover:text-foreground';

const SiteNav: FC<SiteNavProps> = ({
    appUrl = '',
    primary = [],
    resources = {},
}) => {
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const columns = resources.columns ?? [];
    const support = resources.support ?? [];
    const lead = resources.lead;
    const getStartedHref = '/get-started';
    const loginHref = `${appUrl}/login`;

    // Close the mega-menu on Escape; close the mobile sheet when crossing to md.
    useEffect(() => {
        const onKey = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') {
                setResourcesOpen(false);
                setMobileOpen(false);
            }
        };
        document.addEventListener('keydown', onKey);

        const mq = window.matchMedia('(min-width: 768px)');
        const onChange = (): void => {
            if (mq.matches) {
                setMobileOpen(false);
            }
        };
        mq.addEventListener('change', onChange);

        return () => {
            document.removeEventListener('keydown', onKey);
            mq.removeEventListener('change', onChange);
        };
    }, []);

    // Lock body scroll while the mobile sheet is open.
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const openResources = (): void => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
        }
        setResourcesOpen(true);
    };

    const scheduleCloseResources = (): void => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
        }
        closeTimer.current = setTimeout(() => setResourcesOpen(false), 120);
    };

    return (
        <div className="w-full">
            <nav className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between px-4 md:px-0">
                <a
                    href="/"
                    className="flex items-center gap-3 transition-opacity hover:opacity-90"
                >
                    <img
                        src="/favicon.svg"
                        alt="Claryeo"
                        className="h-7 w-auto dark:invert"
                    />
                    <span className="text-lg font-semibold tracking-tight text-foreground">
                        Claryeo
                    </span>
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    {primary.map((item) => (
                        <a key={item.label} href={item.href} className={linkClass}>
                            {item.label}
                        </a>
                    ))}

                    {columns.length > 0 && (
                        <div
                            className="flex items-center"
                            onMouseEnter={openResources}
                            onMouseLeave={scheduleCloseResources}
                        >
                            <button
                                type="button"
                                aria-expanded={resourcesOpen}
                                onClick={() => setResourcesOpen((v) => !v)}
                                className={cn(
                                    'flex items-center gap-1 text-sm transition-colors',
                                    resourcesOpen
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                Resources
                                <ChevronDown
                                    className={cn(
                                        'size-4 transition-transform',
                                        resourcesOpen && 'rotate-180',
                                    )}
                                />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <AppearanceToggle className="shrink-0" />
                    <div className="hidden items-center gap-2 md:flex">
                        <a
                            href={loginHref}
                            className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            Log in
                        </a>
                        <a
                            href={getStartedHref}
                            className="bg-gradient-primary rounded-full px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                        >
                            Get started
                        </a>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        className="inline-flex items-center justify-center rounded-full border border-border/60 bg-muted/40 p-2.5 text-foreground transition-colors hover:bg-muted/70 md:hidden"
                    >
                        {mobileOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Desktop mega-menu */}
            {resourcesOpen && columns.length > 0 && (
                <div
                    className="absolute inset-x-0 top-full hidden border-b border-border bg-background/98 shadow-xl backdrop-blur md:block"
                    onMouseEnter={openResources}
                    onMouseLeave={scheduleCloseResources}
                >
                    <div className="mx-auto w-full max-w-[1180px] px-4 py-8 md:px-0">
                        {lead && (
                            <a
                                href={lead.href}
                                className="group inline-flex items-center gap-1 text-lg font-semibold text-foreground"
                            >
                                {lead.label}
                                <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
                            </a>
                        )}

                        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {columns.map((col) => (
                                <div key={col.title}>
                                    <p className="text-sm font-semibold text-foreground">
                                        {col.title}
                                    </p>
                                    <ul className="mt-3 flex flex-col gap-2.5">
                                        {col.links.map((link) => (
                                            <li key={link.label}>
                                                <a
                                                    href={link.href}
                                                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {support.length > 0 && (
                            <div className="mt-8 border-t border-border pt-6">
                                <p className="text-sm font-semibold text-foreground">
                                    Support
                                </p>
                                <div className="mt-3 flex flex-wrap gap-3">
                                    {support.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="flex min-w-52 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-accent"
                                        >
                                            <div className="flex size-9 items-center justify-center rounded-lg bg-primary-surface text-primary-surface-foreground">
                                                <ArrowUpRight className="size-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {item.label}
                                                </p>
                                                {item.desc && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.desc}
                                                    </p>
                                                )}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Mobile sheet */}
            {mobileOpen && (
                <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-border bg-background px-4 pb-8 shadow-2xl md:hidden">
                    <div className="flex flex-col gap-6 py-6">
                        <div className="flex flex-col gap-4">
                            {primary.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-base font-medium text-foreground"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {columns.map((col) => (
                            <div key={col.title}>
                                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                                    {col.title}
                                </p>
                                <ul className="mt-3 flex flex-col gap-3">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className="flex flex-col gap-3 border-t border-border pt-6">
                            <a
                                href={loginHref}
                                className="text-center text-base font-medium text-foreground"
                            >
                                Log in
                            </a>
                            <a
                                href={getStartedHref}
                                className="bg-gradient-primary rounded-xl px-6 py-3 text-center text-sm font-medium text-primary-foreground shadow-sm"
                            >
                                Get started
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SiteNav;
