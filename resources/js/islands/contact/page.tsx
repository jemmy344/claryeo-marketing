import { Mail, Send } from 'lucide-react';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { socialLinks } from '@/lib/social-links';
import { submitJson } from '@/lib/submit';

type ContactProps = {
    storeUrl?: string;
    thankYouUrl?: string;
};

/**
 * Faithful port of the main app's contact page (resources/js/pages/contact).
 * The Inertia <Form> is replaced with a fetch submit to the marketing proxy
 * route, which forwards to the main app's internal API; on success we navigate
 * to the thank-you page (mirroring the server redirect).
 */
const Contact: FC<ContactProps> = ({
    storeUrl = '/contact',
    thankYouUrl = '/contact/thank-you',
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
            message: ['Something went wrong. Please try again in a moment.'],
        });
    };

    return (
        <section className="relative overflow-hidden px-4 pt-6 pb-16 md:pt-10 md:pb-24">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="relative mx-auto grid w-full max-w-[1180px] gap-6 lg:grid-cols-[1.3fr_1fr]">
                <div className="rounded-3xl border border-border/60 bg-primary/10 p-8 shadow-sm md:p-12">
                    <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
                        Contact
                    </p>
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                        Contact Us
                    </h1>
                    <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
                        Email, or complete the form to learn how Claryeo can
                        support your invoicing, expense tracking, and tax
                        workflows.
                    </p>

                    <div className="mt-10 max-w-sm">
                        <div className="rounded-2xl border border-border/60 bg-card/80 p-4">
                            <Mail className="size-4 text-primary" />
                            <p className="mt-3 text-sm text-muted-foreground">
                                Email
                            </p>
                            <p className="text-sm font-medium">
                                hello@claryeo.com
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 grid gap-4 text-sm md:grid-cols-3">
                        <div className="space-y-2 rounded-2xl border border-border/60 bg-card/70 p-5">
                            <h2 className="text-base font-semibold">
                                Customer Support
                            </h2>
                            <p className="text-muted-foreground">
                                Our team is available Monday to Friday, 9:00 AM
                                – 5:00 PM, to assist with any product or account
                                questions.
                            </p>
                        </div>
                        <div className="space-y-2 rounded-2xl border border-border/60 bg-card/70 p-5">
                            <h2 className="text-base font-semibold">
                                Feedback and Suggestions
                            </h2>
                            <p className="text-muted-foreground">
                                Share ideas that help us shape Claryeo for
                                freelancers and small teams.
                            </p>
                        </div>
                        <div className="space-y-2 rounded-2xl border border-border/60 bg-card/70 p-5">
                            <h2 className="text-base font-semibold">
                                Media Inquiries
                            </h2>
                            <p className="text-muted-foreground">
                                Find us on Instagram, X, and LinkedIn.
                            </p>
                            <div className="flex items-center gap-3 pt-1">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Claryeo on ${social.label}`}
                                        className="rounded-full border border-border/70 bg-background p-2 text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        <svg
                                            className="size-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d={social.path}
                                            />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Get in Touch
                    </h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                        You can reach us any time.
                    </p>

                    <form
                        onSubmit={onSubmit}
                        className="mt-8 flex flex-col gap-5"
                        noValidate
                    >
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="first_name"
                                    className="text-sm font-medium text-foreground"
                                >
                                    First name
                                </label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    placeholder="Jane"
                                    autoComplete="given-name"
                                    className="h-11 rounded-xl"
                                />
                                <InputError message={errors.first_name?.[0]} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="last_name"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Last name
                                </label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Doe"
                                    autoComplete="family-name"
                                    className="h-11 rounded-xl"
                                />
                                <InputError message={errors.last_name?.[0]} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-foreground"
                            >
                                Email
                                <span className="text-primary"> *</span>
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jane@company.com"
                                autoComplete="email"
                                required
                                className="h-11 rounded-xl"
                            />
                            <InputError message={errors.email?.[0]} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="message"
                                className="text-sm font-medium text-foreground"
                            >
                                Message
                                <span className="text-primary"> *</span>
                            </label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="How can we help?"
                                required
                                className="min-h-36 resize-none rounded-xl"
                            />
                            <InputError message={errors.message?.[0]} />
                        </div>
                        <Button
                            type="submit"
                            disabled={processing}
                            size="lg"
                            className="bg-gradient-primary mt-1 h-11 w-full rounded-xl text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
                        >
                            {processing ? (
                                <Spinner />
                            ) : (
                                <>
                                    Send message
                                    <Send className="size-4" />
                                </>
                            )}
                        </Button>
                        <p className="text-center text-xs text-muted-foreground">
                            By contacting us, you agree to our terms and privacy
                            policy.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
