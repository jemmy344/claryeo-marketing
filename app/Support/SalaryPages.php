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

    /**
     * @return list<array<string, mixed>>
     */
    public static function all(): array
    {
        self::$cache ??= self::load();

        return self::$cache;
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function find(string $slug): ?array
    {
        foreach (self::all() as $page) {
            if (($page['slug'] ?? null) === $slug) {
                return $page;
            }
        }

        return null;
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
     * @return list<array<string, mixed>>
     */
    private static function load(): array
    {
        $path = resource_path('data/salary_pages.json');

        if (! file_exists($path)) {
            return [];
        }

        $decoded = json_decode((string) file_get_contents($path), true);

        if (! is_array($decoded)) {
            return [];
        }

        $pages = [];

        foreach ($decoded as $page) {
            if (is_array($page)) {
                $pages[] = $page;
            }
        }

        return $pages;
    }
}
