import { ArrowRight, Mail, User } from 'lucide-react';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { submitJson } from '@/lib/submit';

type WaitlistProps = {
    storeUrl?: string;
    thankYouUrl?: string;
};

/**
 * Faithful port of the main app's waitlist page (resources/js/pages/waitlist).
 * The Inertia <Form> is replaced with a fetch submit to the marketing proxy
 * route, which forwards to the main app's internal API; on success we navigate
 * to the thank-you page (mirroring the server redirect).
 */
const Waitlist: FC<WaitlistProps> = ({
    storeUrl = '/waitlist',
    thankYouUrl = '/waitlist/thank-you',
}) => {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setProcessing(true);
        setErrors({});

        const body = Object.fromEntries(
            new FormData(event.currentTarget).entries(),
        );
        const result = await submitJson(storeUrl, body);

        if (result.ok) {
            window.location.href = thankYouUrl;
            return;
        }

        setProcessing(false);

        if (result.status === 422) {
            setErrors(result.errors);
            return;
        }

        setErrors({
            email: ['Something went wrong. Please try again in a moment.'],
        });
    };

    return (
        <main className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden px-4 py-16">
            {/* Atmospheric background: subtle speckles */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-50"
                aria-hidden
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>
            {/* Faint gradient lines */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
                aria-hidden
            >
                <div className="absolute top-0 left-1/4 h-full w-px bg-linear-to-b from-transparent via-(--gradient-primary-from) to-transparent" />
                <div className="absolute bottom-1/4 left-0 h-px w-full bg-linear-to-r from-transparent via-(--gradient-primary-to) to-transparent" />
                <div className="absolute top-1/4 right-1/3 h-full w-px bg-linear-to-b from-transparent via-(--gradient-primary-from) to-transparent" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-md text-center">
                {/* Branding */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute -inset-4 rounded-full bg-primary/5 dark:bg-primary/10" />
                        <div className="absolute -inset-2 rounded-full border border-primary/10 dark:border-primary/20" />
                        <a
                            href="/"
                            className="relative block transition-opacity hover:opacity-90"
                            aria-label="Claryeo home"
                        >
                            <img
                                src="/favicon.svg"
                                alt="Claryeo"
                                className="h-12 w-auto dark:invert"
                            />
                        </a>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="mt-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Join the waitlist for{' '}
                    <span className="text-gradient-primary bg-clip-text font-bold text-transparent">
                        Claryeo
                    </span>
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">
                    Join the waitlist today and get 3 months free, plus early
                    access to help shape the product.
                </p>

                {/* Form */}
                <form
                    onSubmit={onSubmit}
                    className="mt-10 flex flex-col gap-5"
                    noValidate
                >
                    <div className="flex flex-col gap-2">
                        <div className="focus-within:ring-opacity-20 dark:focus-within:ring-opacity-30 flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 transition-colors duration-200 focus-within:border-(--gradient-primary-from) focus-within:ring-2 focus-within:ring-(--gradient-primary-from) dark:bg-muted/20">
                            <User className="size-5 shrink-0 text-muted-foreground" />
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Full name..."
                                autoComplete="name"
                                className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <InputError
                            message={errors?.name?.[0]}
                            className="mt-0.5 text-left"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="focus-within:ring-opacity-20 dark:focus-within:ring-opacity-30 flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 transition-colors duration-200 focus-within:border-(--gradient-primary-from) focus-within:ring-2 focus-within:ring-(--gradient-primary-from) dark:bg-muted/20">
                            <Mail className="size-5 shrink-0 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                placeholder="Email address..."
                                autoComplete="email"
                                className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <InputError
                            message={errors?.email?.[0]}
                            className="mt-0.5 text-left"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        size="lg"
                        className="mt-2 w-full rounded-xl py-6 text-base shadow-sm"
                    >
                        {processing ? (
                            <Spinner />
                        ) : (
                            <>
                                Join waitlist
                                <ArrowRight className="size-5" />
                            </>
                        )}
                    </Button>
                </form>

                {/* Footer */}
                <p className="mt-12 text-center text-xs text-muted-foreground">
                    Invoicing, expenses & tax for freelancers. Rolling out in
                    Nigeria first.
                </p>
            </div>
        </main>
    );
};

export default Waitlist;
