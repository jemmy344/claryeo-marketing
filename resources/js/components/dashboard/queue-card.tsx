import { ChevronDown, Clock, MoreVertical, Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, formatCurrency } from '@/lib/utils';

/**
 * Ported from claryeo/resources/js/pages/transactions/reconciliation/components/payments-queue/queue-card.tsx --
 * the real reconciliation queue card, unmodified except: the receipt-download
 * menu item (needs a live transaction + wayfinder route) is dropped, and the
 * shared `payment-matching` types are inlined to the fields this component
 * actually reads.
 */
const naira = (amount: number): string => formatCurrency(amount);
const formatDay = (iso: string): string =>
    new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' });

export type BankCredit = {
    id: string;
    amount: number;
    remaining: number;
    bank: string;
    receivedAt: string;
    description: string;
    staleSinceDays?: number;
    partialNote?: string;
    possibleDuplicateOf?: {
        amount: number;
        invoiceNumber: string;
        method: string;
        clientName: string;
        recordedAt: string;
    };
    suggestion?: {
        confidence: 'likely' | 'possible';
        invoiceNumber: string;
        clientName: string;
        amountDue: number;
        reasons: string[];
    };
    otherCandidates?: { invoiceId: string; invoiceNumber: string; clientName: string; amountDue: number }[];
};

export type QueueCardProps = {
    credit: BankCredit;
    onOpenMatchScreen: (creditId: string) => void;
    onSetAside: (creditId: string) => void;
    onAcceptSuggestion: (creditId: string) => void;
};

const QueueCard: FC<QueueCardProps> = ({ credit, onOpenMatchScreen, onSetAside, onAcceptSuggestion }) => {
    const [showOtherCandidates, setShowOtherCandidates] = useState(false);
    const isPartialRemainder = credit.remaining < credit.amount;

    return (
        <div className="rounded-lg border bg-card shadow-xs">
            {credit.staleSinceDays !== undefined && (
                <div className="flex items-center gap-2 rounded-t-lg bg-pending-tint px-4 py-2 text-xs text-pending">
                    <Clock className="size-3.5" />
                    Still waiting · {credit.staleSinceDays} days
                </div>
            )}
            {isPartialRemainder && (
                <div className="rounded-t-lg bg-info-tint px-4 py-2 text-xs text-info">
                    {naira(credit.remaining)} left of {naira(credit.amount)}
                    {credit.partialNote ? ` · ${credit.partialNote}` : ''}
                </div>
            )}

            <div className="flex items-start justify-between gap-3 p-4">
                <div className="min-w-0 flex-1 rounded-md bg-muted/60 p-3">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-mono text-lg font-semibold">{naira(credit.remaining)}</span>
                        <span className="text-xs text-muted-foreground">
                            {credit.bank} · {formatDay(credit.receivedAt)}
                        </span>
                    </div>
                    <p className="mt-1 truncate font-mono text-xs text-muted-foreground">{credit.description}</p>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 shrink-0" aria-label="More options">
                            <MoreVertical className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onSetAside(credit.id)}>
                            Set aside, not for an invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>Decide later, it keeps waiting here</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {credit.possibleDuplicateOf ? (
                <div className="border-t px-4 py-3">
                    <p className="text-sm font-medium">
                        Is this the {naira(credit.possibleDuplicateOf.amount)} you already recorded on{' '}
                        {credit.possibleDuplicateOf.invoiceNumber}?
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        You recorded a {credit.possibleDuplicateOf.method.toLowerCase()} payment for{' '}
                        {credit.possibleDuplicateOf.clientName} on {formatDay(credit.possibleDuplicateOf.recordedAt)}.
                        Matching both would count the money twice.
                    </p>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <Button size="sm" className="sm:flex-1">
                            Same payment
                        </Button>
                        <Button size="sm" variant="outline" className="sm:flex-1">
                            Different payment
                        </Button>
                    </div>
                </div>
            ) : credit.suggestion ? (
                <div className="border-t px-4 py-3">
                    <div className="rounded-md bg-secondary p-3">
                        <span className="text-xs font-medium tracking-wide text-secondary-foreground uppercase">
                            {credit.suggestion.confidence === 'likely' ? 'Direct match' : 'Possible match'}
                        </span>
                        <p className="mt-1 text-sm">
                            Looks like payment for{' '}
                            <span className="font-semibold">
                                {credit.suggestion.invoiceNumber} · {credit.suggestion.clientName} ·{' '}
                                {naira(credit.suggestion.amountDue)}
                            </span>
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {credit.suggestion.reasons.map((reason) => (
                                <span key={reason} className="rounded-full bg-card px-2 py-0.5 text-xs text-muted-foreground">
                                    {reason}
                                </span>
                            ))}
                        </div>

                        {!!credit.otherCandidates?.length && (
                            <button
                                type="button"
                                onClick={() => setShowOtherCandidates((v) => !v)}
                                className="mt-2 flex items-center gap-1 text-xs font-medium text-secondary-foreground"
                            >
                                See {credit.otherCandidates.length} other possible match
                                {credit.otherCandidates.length > 1 ? 'es' : ''}
                                <ChevronDown
                                    className={cn('size-3.5 transition-transform', showOtherCandidates && 'rotate-180')}
                                />
                            </button>
                        )}
                        {showOtherCandidates &&
                            credit.otherCandidates?.map((candidate) => (
                                <div
                                    key={candidate.invoiceId}
                                    className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-md bg-card p-2 text-sm"
                                >
                                    <span>
                                        {candidate.invoiceNumber} · {candidate.clientName} · {naira(candidate.amountDue)}
                                    </span>
                                    <Button size="sm" variant="outline">
                                        Match this one
                                    </Button>
                                </div>
                            ))}
                    </div>

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <Button
                            size="sm"
                            className="bg-positive text-white hover:bg-positive/90 sm:flex-1"
                            onClick={() => onAcceptSuggestion(credit.id)}
                        >
                            <Sparkles className="size-4" />
                            Yes, match it
                        </Button>
                        <Button size="sm" variant="outline" className="sm:flex-1" onClick={() => onOpenMatchScreen(credit.id)}>
                            Not this one
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="border-t px-4 py-3">
                    <Button size="sm" variant="outline" className="w-full" onClick={() => onOpenMatchScreen(credit.id)}>
                        Match to an invoice
                    </Button>
                </div>
            )}
        </div>
    );
};

export default QueueCard;
