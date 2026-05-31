import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import type { FC } from 'react';

import ContentSection from '@/components/landing/content-section';
import LandingFAQs from '@/components/landing/landing-faqs';
import LandingFeatures from '@/components/landing/landing-features';
import LandingPricing from '@/components/landing/landing-pricing';
import LandingTestimonials from '@/components/landing/landing-testimonials';
import LogoCloud from '@/components/landing/logo-cloud';
import type { PlanCatalogItem } from '@/types/plan-catalog';

type StatProps = {
  label: string;
  value: string;
};

const Stat: FC<StatProps> = ({ label, value }) => (
  <div className="space-y-1">
    <div className="text-3xl font-semibold tracking-tight text-foreground">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

type SoftButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  className?: string;
};

const SoftButton: FC<SoftButtonProps> = ({ children, className = '', ...props }) => (
  <button
    type="button"
    className={
      'rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ' +
      'bg-gradient-primary text-primary-foreground hover:opacity-90 ' +
      className
    }
    {...props}
  >
    {children}
  </button>
);

function MiniBars() {
  return (
    <div className="mt-6 flex h-36 items-end gap-4 rounded-xl bg-muted/50 p-4 transition-colors duration-300 dark:bg-muted/20">
      {[18, 48, 72, 96].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0.6 }}
          animate={{ height: h }}
          transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
          className="w-10 rounded-xl bg-linear-to-t from-primary/30 to-primary/60 shadow-inner transition-colors duration-300 dark:from-primary/40 dark:to-primary/70"
        />
      ))}
    </div>
  );
}

function Planet() {
  return (
    <motion.svg
      initial={{ rotate: -8 }}
      animate={{ rotate: 0 }}
      transition={{ duration: 2, type: 'spring' }}
      width="220"
      height="220"
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <defs>
        <linearGradient id="claryeo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gradient-primary-from)" />
          <stop offset="100%" stopColor="var(--gradient-primary-to)" />
        </linearGradient>
      </defs>
      <circle cx="110" cy="110" r="56" fill="url(#claryeo-grad)" opacity={0.95} />
      <circle cx="94" cy="98" r="10" fill="white" opacity={0.45} />
      <circle cx="132" cy="126" r="8" fill="white" opacity={0.35} />
      <motion.ellipse
        cx="110"
        cy="110"
        rx="100"
        ry="34"
        stroke="white"
        strokeOpacity={0.6}
        fill="none"
        animate={{ strokeDashoffset: [200, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        strokeDasharray="200 200"
      />
      <motion.circle
        cx="210"
        cy="110"
        r="4"
        fill="white"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
    </motion.svg>
  );
}

type LandingProps = {
  plans?: PlanCatalogItem[];
  showLogoCloud?: boolean;
  waitlistMode?: boolean;
};

const Landing: FC<LandingProps> = ({
  plans = [],
  showLogoCloud = false,
  waitlistMode = false,
}) => {
  const getStartedUrl = waitlistMode ? '/waitlist' : '/get-started';
  const waitlistUrl = '/waitlist';

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      {/* Hero area */}
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-6 px-4 pt-12 pb-24 md:grid-cols-2 md:px-0 md:pt-16 md:pb-32">
        {/* Left: headline */}
        <div className="flex flex-col justify-center space-y-8 pr-2">
          <div>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Invoicing, expenses,
              <br />
              and tax in one place.
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Built for freelancers and small businesses. An{' '}
              <span className="font-medium text-foreground">AI-powered experience</span> across
              the app—automatic bank sync, realtime tracking, insights, invoices and receipts, and
              transaction analysis—so you spend less time on admin. Rolling out in Nigeria first.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="/tax-calculator">
              <SoftButton>
                Open tax calculator <ArrowUpRight className="ml-1 inline h-4 w-4" />
              </SoftButton>
            </a>
            <a href={waitlistUrl} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Join the waitlist
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2 sm:grid-cols-3 sm:gap-8">
            <Stat label="Invoices & receipts" value="Unlimited" />
            <Stat label="Bank sync" value="Automatic" />
            <Stat label="Realtime tracking" value="Always on" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 opacity-90">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              For freelancers & SMEs
            </span>
            <span className="text-sm text-muted-foreground">Nigeria first · FIRS-ready</span>
          </div>
        </div>

        {/* Right: animated card grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Secure card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative col-span-1 overflow-hidden rounded-xl bg-linear-to-b from-primary to-primary/90 p-6 text-primary-foreground shadow-lg transition-colors duration-300 dark:from-primary-surface dark:to-primary-surface dark:text-primary-surface-foreground"
          >
            <div className="absolute inset-0 opacity-30">
              <svg className="h-full w-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="rg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <rect width="400" height="400" fill="url(#rg)" />
                {[...Array(12)].map((_, i) => (
                  <circle
                    key={i}
                    cx="200"
                    cy="200"
                    r={20 + i * 14}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.12}
                  />
                ))}
              </svg>
            </div>

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-2 ring-1 ring-white/10 dark:bg-primary-surface-foreground/15 dark:ring-primary-surface-foreground/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-xs uppercase tracking-wider text-primary-foreground/80 dark:text-primary-surface-foreground/80">Secure</span>
              </div>
              <div className="mt-6 text-xl leading-snug text-primary-foreground/95 dark:text-foreground/95">
                Your data stays private
                <br /> and secure
              </div>
              <motion.div
                className="absolute right-6 top-6 h-12 w-12 rounded-full bg-white/20 dark:bg-primary-surface-foreground/15"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(255,255,255,0.35)',
                    '0 0 0 16px rgba(255,255,255,0)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Tax & reports card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative col-span-1 overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground shadow-lg transition-colors duration-300 dark:border-border dark:bg-card"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 opacity-70">
              <Planet />
            </div>
            <div className="relative mt-24 text-sm text-muted-foreground">Tax summaries</div>
            <div className="text-xl font-medium leading-snug text-foreground">
              PIT, CIT & VAT
              <br />
              in one dashboard
            </div>
          </motion.div>

          {/* Growth card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-1 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-lg transition-colors duration-300 dark:border-border dark:bg-card"
          >
            <div className="text-sm text-muted-foreground">Profit & loss</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              Reports <span className="text-sm font-medium text-muted-foreground align-middle">ready</span>
            </div>
            <div className="mt-1 text-xs text-primary">Export PDF / CSV</div>
            <MiniBars />
          </motion.div>

          {/* AI card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="col-span-1 rounded-xl border border-primary/30 bg-primary/5 p-6 shadow-lg transition-colors duration-300 dark:border-primary-surface-foreground/25 dark:bg-primary-surface"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/20 p-2 ring-1 ring-primary/20 dark:bg-primary-surface-foreground/15 dark:ring-primary-surface-foreground/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-primary">AI-powered</span>
            </div>
            <div className="mt-4 text-lg font-semibold leading-snug text-foreground">
              Your business companion
              <br />
              across the whole app
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Insights, analytics, smart drafts for invoices and receipts, and transaction analysis—so you can figure things out without the guesswork.
            </p>
          </motion.div>
        </div>
      </div>

      {showLogoCloud && <LogoCloud />}

      <section
        id="tax-calculator-cta"
        className="border-t border-border bg-muted/20 py-16 transition-colors duration-300 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            Try our tax calculator for free
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Estimate your tax (Nigeria, PIT/CIT) with income and expenses. No account required—nothing is saved until you sign up.
          </p>
          <a
            href="/tax-calculator"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Open tax calculator
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>

      <section id="benefits">
        <LandingFeatures />
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border bg-muted/20 py-16 transition-colors duration-300">
        <div className="mx-auto max-w-[1180px] px-4 md:px-0">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Three simple steps to invoicing, expenses, and tax—with AI across the app to help you get more done.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { step: 1, title: 'Sign up', desc: 'Create your account and set your business type.' },
              { step: 2, title: 'Run your business', desc: 'Use AI for insights, drafts, and analysis—or add clients and build invoices manually. Your call.' },
              { step: 3, title: 'Track & export', desc: 'Bank transactions sync automatically—no manual entry. Realtime account tracking and analysis. Export reports when you need them.' },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="rounded-xl border border-border bg-card p-6 text-center transition-colors duration-300"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
                  {step}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContentSection
          waitlistUrl={waitlistUrl}
          getStartedUrl={getStartedUrl}
          waitlistMode={waitlistMode}
      />

      {!waitlistMode && plans.length > 0 && <LandingPricing plans={plans} />}

      {!waitlistMode && <LandingTestimonials />}

      <LandingFAQs />

      {/* Final CTA */}
      <section id="cta" className="border-t border-border bg-primary/10 py-16 transition-colors duration-300 dark:bg-primary-surface">
        <div className="mx-auto max-w-[1180px] px-4 text-center md:px-0">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Invoicing, expenses, and tax in one place—bank sync, realtime tracking, and an AI-powered experience across the app. Create your account or join the waitlist.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={getStartedUrl}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              {waitlistMode ? 'Join the waitlist' : 'Get started'}{' '}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {!waitlistMode && (
              <a
                href={waitlistUrl}
                className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Join the waitlist
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
