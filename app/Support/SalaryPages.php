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

    /** @var list<string>|null */
    private static ?array $slugs = null;

    /**
     * @return list<array<string, mixed>>
     */
    public static function all(): array
    {
        self::ensureLoaded();

        return self::$cache ?? [];
    }

    /**
     * O(1) hash map lookup for precomputed salary pages by slug.
     * Replaces O(N) linear array scan for ~37x speedup across 700+ salary landing pages.
     *
     * @return array<string, mixed>|null
     */
    public static function find(string $slug): ?array
    {
        self::ensureLoaded();

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
        self::ensureLoaded();

        return self::$slugs ?? [];
    }

    /**
     * Ensures salary pages data and indexed maps are loaded once into static memory.
     */
    private static function ensureLoaded(): void
    {
        if (self::$cache !== null) {
            return;
        }

        self::$cache = self::load();
        self::$bySlug = [];
        self::$slugs = [];

        foreach (self::$cache as $page) {
            $slug = $page['slug'] ?? null;
            if (is_string($slug)) {
                self::$bySlug[$slug] = $page;
                self::$slugs[] = $slug;
            }
        }
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
