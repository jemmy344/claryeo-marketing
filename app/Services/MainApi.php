<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Client for the main Claryeo app's internal API (private networking + shared
 * secret). Read endpoints are cached with a stale-on-error fallback so the
 * marketing pages keep rendering if the main app is briefly unreachable.
 */
class MainApi
{
    private const CACHE_TTL = 300;

    private const TIMEOUT = 8;

    public function __construct(
        private readonly string $baseUrl,
        private readonly string $token,
    ) {}

    /**
     * Public plan catalog, comparison matrix, and add-on rows.
     *
     * @return array<string, mixed>
     */
    public function pricing(): array
    {
        return $this->cachedGet('marketing:pricing', 'pricing', []);
    }

    /**
     * Current content + metadata for a legal document (slug: privacy|terms|cookies).
     *
     * @return array<string, mixed>|null
     */
    public function legalDocument(string $slug): ?array
    {
        return $this->cachedGet("marketing:legal:{$slug}", "legal/{$slug}", null);
    }

    /**
     * A specific archived version of a legal document.
     *
     * @return array<string, mixed>|null
     */
    public function legalDocumentVersion(string $slug, string $version): ?array
    {
        return $this->cachedGet("marketing:legal:{$slug}:{$version}", "legal/{$slug}/{$version}", null);
    }

    /**
     * Version history for a legal document.
     *
     * @return array<string, mixed>|null
     */
    public function legalVersions(string $slug): ?array
    {
        return $this->cachedGet("marketing:legal:{$slug}:versions", "legal/{$slug}/versions", null);
    }

    /**
     * Submit a contact message. Not cached.
     *
     * @param  array<string, mixed>  $payload
     */
    public function submitContact(array $payload): Response
    {
        return $this->request()->post('contact', $payload);
    }

    /**
     * Submit a waitlist signup. Not cached.
     *
     * @param  array<string, mixed>  $payload
     */
    public function submitWaitlist(array $payload): Response
    {
        return $this->request()->post('waitlist', $payload);
    }

    /**
     * Submit a tax-calculator estimate for emailing. Not cached.
     *
     * @param  array<string, mixed>  $payload
     */
    public function submitTaxReport(array $payload): Response
    {
        return $this->request()->post('tax-calculator/report', $payload);
    }

    private function request(): PendingRequest
    {
        return Http::baseUrl(rtrim($this->baseUrl, '/').'/api/internal')
            ->withHeaders(['X-Internal-Token' => $this->token])
            ->acceptJson()
            ->timeout(self::TIMEOUT);
    }

    /**
     * GET a `data`-wrapped endpoint, caching success and serving the last good
     * value (or the fallback) on failure.
     *
     * @template TFallback
     *
     * @param  TFallback  $fallback
     * @return array<string, mixed>|TFallback
     */
    private function cachedGet(string $cacheKey, string $path, mixed $fallback): mixed
    {
        try {
            return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($path, $fallback) {
                $response = $this->request()->get($path);

                if ($response->failed()) {
                    throw new \RuntimeException("Main API GET {$path} returned {$response->status()}");
                }

                return $response->json('data', $fallback);
            });
        } catch (Throwable $e) {
            Log::warning('MainApi GET failed; serving cached/fallback value.', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);

            return Cache::get($cacheKey, $fallback);
        }
    }
}
