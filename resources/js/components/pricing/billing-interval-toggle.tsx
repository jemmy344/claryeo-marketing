import type { FC } from 'react';

import { cn } from '@/lib/utils';

import type { BillingInterval } from './pricing-utils';

type BillingIntervalToggleProps = {
    value: BillingInterval;
    onChange: (next: BillingInterval) => void;
    savePercent: number | null;
    compact?: boolean;
};

const BillingIntervalToggle: FC<BillingIntervalToggleProps> = ({
    value,
    onChange,
    savePercent,
    compact = false,
}) => (
    <div className="flex justify-center">
        <button
            type="button"
            onClick={() => onChange('monthly')}
            className={cn(
                'rounded-lg px-4 py-3 text-sm font-semibold transition-all',
                compact && 'px-3 py-2 text-xs',
                value === 'monthly'
                    ? 'bg-card text-foreground shadow-md ring-1 ring-border'
                    : 'text-muted-foreground hover:text-foreground',
            )}
        >
            {compact ? 'Monthly' : 'Monthly billing'}
        </button>
        <button
            type="button"
            onClick={() => onChange('annual')}
            className={cn(
                'rounded-lg px-4 py-3 text-sm font-semibold transition-all',
                compact && 'px-3 py-2 text-xs',
                value === 'annual'
                    ? 'bg-card text-foreground shadow-md ring-1 ring-border'
                    : 'text-muted-foreground hover:text-foreground',
            )}
        >
            <span className="inline-flex items-center gap-2">
                {compact ? 'Annual' : 'Annual billing'}
                {savePercent != null && savePercent > 0 && (
                    <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary dark:bg-primary/25">
                        Save {savePercent}%
                    </span>
                )}
            </span>
        </button>
    </div>
);

export default BillingIntervalToggle;
