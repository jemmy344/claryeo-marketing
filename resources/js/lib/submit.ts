export interface SubmitResult {
    ok: boolean;
    status: number;
    data: Record<string, unknown> | null;
    errors: Record<string, string[]>;
}

/**
 * POST JSON to a marketing proxy endpoint, including the CSRF token from the
 * page meta tag. The proxy relays the main app's validation response, so a 422
 * carries Laravel-shaped `errors`.
 */
export async function submitJson(url: string, body: Record<string, unknown>): Promise<SubmitResult> {
    const token = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-CSRF-TOKEN': token,
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(body),
    });

    let data: Record<string, unknown> | null = null;
    try {
        data = (await response.json()) as Record<string, unknown>;
    } catch {
        data = null;
    }

    const errors = (data?.errors as Record<string, string[]> | undefined) ?? {};

    return { ok: response.ok, status: response.status, data, errors };
}
