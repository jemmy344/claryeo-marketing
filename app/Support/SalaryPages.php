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
     * Find a salary page by its slug using an O(1) hash map lookup.
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
        if (self::$bySlug === null) {
            self::load();
        }

        return array_keys(self::$bySlug ?? []);
    }

    /**
     * Load and index salary pages from JSON into both a list and a slug-keyed hash map.
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
                /** @var array<string, mixed> $page */
                $pages[] = $page;
                if (isset($page['slug']) && is_string($page['slug'])) {
                    $bySlug[$page['slug']] = $page;
                }
            }
        }

        self::$cache = $pages;
        self::$bySlug = $bySlug;
    }
}
