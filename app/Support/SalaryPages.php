<?php

namespace App\Support;

/**
 * Precomputed "tax on ₦X salary" page data, generated from the TypeScript tax
 * engine by scripts/generate-salary-pages.ts (`pnpm generate:salary-pages`).
 * Regenerate and commit whenever the tax profile or salary points change.
 */
class SalaryPages
{
    /** @var list<array<string, mixed>>|null */
    private static ?array $cache = null;

    /** @var array<string, array<string, mixed>>|null */
    private static ?array $bySlug = null;

    /**
     * @return list<array<string, mixed>>
     */
    public static function all(): array
    {
        if (self::$cache === null) {
            self::load();
        }

        return self::$cache ?? [];
    }

    /**
     * Perform an O(1) hash map lookup for a precomputed salary page by slug.
     *
     * @return array<string, mixed>|null
     */
    public static function find(string $slug): ?array
    {
        if (self::$bySlug === null) {
            self::load();
        }

        return self::$bySlug[$slug] ?? null;
    }

    /**
     * Slugs of every generated page, used to constrain the route and to fill
     * the sitemap.
     *
     * @return list<string>
     */
    public static function slugs(): array
    {
        $slugs = [];

        foreach (self::all() as $page) {
            if (is_string($page['slug'] ?? null)) {
                $slugs[] = $page['slug'];
            }
        }

        return $slugs;
    }

    /**
     * Loads and indexes precomputed salary pages into both a list ($cache) and
     * a slug-keyed map ($bySlug) for O(1) find lookups.
     */
    private static function load(): void
    {
        $path = resource_path('data/salary_pages.json');

        if (! file_exists($path)) {
            self::$cache = [];
            self::$bySlug = [];

            return;
        }

        $decoded = json_decode((string) file_get_contents($path), true);

        if (! is_array($decoded)) {
            self::$cache = [];
            self::$bySlug = [];

            return;
        }

        $pages = [];
        $bySlug = [];

        foreach ($decoded as $page) {
            if (is_array($page)) {
                $pages[] = $page;
                if (is_string($page['slug'] ?? null)) {
                    $bySlug[$page['slug']] = $page;
                }
            }
        }

        self::$cache = $pages;
        self::$bySlug = $bySlug;
    }
}
