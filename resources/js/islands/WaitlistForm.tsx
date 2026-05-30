import { useState, type FormEvent } from 'react';
import { submitJson } from '../lib/submit';

interface WaitlistFormProps {
    storeUrl?: string;
    thankYouUrl?: string;
}

export default function WaitlistForm({ storeUrl = '/waitlist', thankYouUrl = '/waitlist/thank-you' }: WaitlistFormProps) {
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
        'w-full rounded-lg border border-border bg-white px-3 py-2.5 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30';

    return (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
            {formError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{formError}</div>
            )}

            <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name (optional)" className={inputClass} />
                {errors.name?.[0] && <p className="mt-1 text-sm text-destructive">{errors.name[0]}</p>}
            </div>

            <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
                {errors.email?.[0] && <p className="mt-1 text-sm text-destructive">{errors.email[0]}</p>}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
                {processing ? 'Joining…' : 'Join the waitlist'}
            </button>
        </form>
    );
}
