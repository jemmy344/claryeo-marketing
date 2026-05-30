import { useState, type FormEvent } from 'react';
import { submitJson } from '../lib/submit';

interface ContactFormProps {
    storeUrl?: string;
    thankYouUrl?: string;
}

function FieldError({ messages }: { messages?: string[] }) {
    if (!messages || messages.length === 0) {
        return null;
    }

    return <p className="mt-1 text-sm text-destructive">{messages[0]}</p>;
}

export default function ContactForm({ storeUrl = '/contact', thankYouUrl = '/contact/thank-you' }: ContactFormProps) {
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [formError, setFormError] = useState<string | null>(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setProcessing(true);
        setErrors({});
        setFormError(null);

        const body = Object.fromEntries(new FormData(event.currentTarget).entries());
        const result = await submitJson(storeUrl, body);

        setProcessing(false);

        if (result.ok) {
            window.location.href = thankYouUrl;
            return;
        }

        if (result.status === 422) {
            setErrors(result.errors);
            return;
        }

        setFormError('Something went wrong. Please try again in a moment.');
    }

    const inputClass =
        'mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30';

    return (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
            {formError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{formError}</div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="first_name" className="text-sm font-medium text-foreground">First name</label>
                    <input id="first_name" name="first_name" type="text" className={inputClass} />
                    <FieldError messages={errors.first_name} />
                </div>
                <div>
                    <label htmlFor="last_name" className="text-sm font-medium text-foreground">Last name</label>
                    <input id="last_name" name="last_name" type="text" className={inputClass} />
                    <FieldError messages={errors.last_name} />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <input id="email" name="email" type="email" required className={inputClass} />
                <FieldError messages={errors.email} />
            </div>

            <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea id="message" name="message" rows={5} required className={inputClass} />
                <FieldError messages={errors.message} />
            </div>

            <button
                type="submit"
                disabled={processing}
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
                {processing ? 'Sending…' : 'Send message'}
            </button>
        </form>
    );
}
