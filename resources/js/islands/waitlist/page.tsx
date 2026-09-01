import { ArrowRight, Mail, Phone, User } from 'lucide-react';
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

const FIELDS = [
    {
        name: 'name',
        type: 'text',
        icon: User,
        placeholder: 'Full name',
        autoComplete: 'name',
    },
    {
        name: 'email',
        type: 'email',
        icon: Mail,
        placeholder: 'Email address',
        autoComplete: 'email',
        required: true,
    },
    {
        name: 'phone',
        type: 'tel',
        icon: Phone,
        placeholder: 'Phone number (optional)',
        autoComplete: 'tel',
        inputMode: 'tel' as const,
    },
];

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

    const onSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> => {
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
                className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)] dark:opacity-30"
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

                {/* Headline. The wordmark keeps the logo's sans face — never
                    the Fraunces display used by the rest of the heading. */}
                <h1 className="t-display-2 mt-8 text-balance text-foreground">
                    <span className="text-gradient-primary bg-clip-text font-sans font-semibold tracking-tight text-transparent">
                        Claryeo
                    </span>{' '}
                    is coming.
                    <br />
                    <em>Get in</em> early.
                </h1>
                <p className="t-body-sm mx-auto mt-4 max-w-sm text-balance text-muted-foreground">
                    Invoicing, expenses and tax in one place. Join the list and
                    we'll send your invite as soon as it's ready.
                </p>

                {/* Form */}
                <form
                    onSubmit={onSubmit}
                    className="mt-10 flex flex-col gap-3"
                    noValidate
                >
                    {FIELDS.map((field) => (
                        <div key={field.name} className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 transition-colors duration-200 focus-within:border-(--gradient-primary-from) focus-within:ring-2 focus-within:ring-(--gradient-primary-from)/20 dark:bg-muted/20">
                                <field.icon className="size-4.5 shrink-0 text-muted-foreground" />
                                {/* The design has no visible labels, so the
                                    placeholder text has to reach assistive
                                    tech some other way -- a placeholder alone
                                    is not an accessible name, and vanishes as
                                    soon as the user types. */}
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    inputMode={field.inputMode}
                                    required={field.required}
                                    placeholder={field.placeholder}
                                    autoComplete={field.autoComplete}
                                    aria-label={field.placeholder}
                                    aria-invalid={
                                        errors?.[field.name] ? true : undefined
                                    }
                                    aria-describedby={
                                        errors?.[field.name]
                                            ? `${field.name}-error`
                                            : undefined
                                    }
                                    className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                            <InputError
                                id={`${field.name}-error`}
                                message={errors?.[field.name]?.[0]}
                                className="text-left"
                            />
                        </div>
                    ))}

                    <Button
                        type="submit"
                        disabled={processing}
                        size="lg"
                        className="bg-gradient-primary mt-3 w-full rounded-xl py-6 text-base text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                    >
                        {processing ? (
                            <Spinner />
                        ) : (
                            <>
                                Save my spot
                                <ArrowRight className="size-5" />
                            </>
                        )}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        We&apos;ll email you when your invite is ready. No spam.
                    </p>
                </form>

                {/* Footer */}
                <p className="mt-12 text-center text-xs text-muted-foreground">
                    Built for freelancers and small businesses. Rolling out in
                    Nigeria first.
                </p>
            </div>
        </main>
    );
};

export default Waitlist;
