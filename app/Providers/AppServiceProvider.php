<?php

namespace App\Providers;

use App\Http\View\Composers\BlogIndexComposer;
use App\Services\MainApi;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(MainApi::class, function ($app): MainApi {
            $config = $app['config'];

            return new MainApi(
                (string) $config->get('services.main_api.url'),
                (string) $config->get('services.main_api.token'),
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $appUrl = Config::string('services.claryeo_app.url');
        /** @var array{
         *     primary?: list<array{label: string, href: string}>,
         *     resources?: mixed,
         *     footer?: array<int, array{group: string, items: array<int, array{title: string, href: string}>}>,
         *     social?: mixed,
         * } $nav
         */
        $nav = Config::array('marketing_nav');
        $waitlistMode = (bool) config('marketing.waitlist_mode');

        $primaryCta = $waitlistMode
            ? ['label' => 'Join the waitlist', 'href' => '/waitlist']
            : ['label' => 'Get started', 'href' => '/get-started'];

        // In waitlist mode, pricing/get-started are hidden everywhere.
        $hidden = $waitlistMode ? ['/pricing', '/get-started'] : [];
        $primaryLinks = array_values(array_filter(
            $nav['primary'] ?? [],
            static fn (array $link): bool => ! in_array($link['href'], $hidden, true),
        ));

        // Features mega-menu, built from the individual feature pages.
        /** @var array<string, array<string, mixed>> $featurePages */
        $featurePages = Config::array('feature_pages', []);
        $str = static fn (mixed $v): string => is_string($v) ? $v : '';
        $featureItems = collect($featurePages)
            // Nullish reads on purpose: this runs in boot() for every request,
            // so a feature entry missing a key degrades one menu row instead of
            // 500-ing the whole site.
            ->map(fn (array $f): array => [
                'eyebrow' => $str($f['eyebrow'] ?? null),
                'title' => $str($f['title'] ?? null),
                'tagline' => $str($f['tagline'] ?? null),
                'slug' => $str($f['slug'] ?? null),
                'badge' => $f['badge'] ?? null,
            ])
            ->filter(fn (array $f): bool => $f['title'] !== '' && $f['slug'] !== '')
            ->map(fn (array $f): array => [
                ...$f,
                'href' => '/features/'.$f['slug'],
            ])
            ->values()
            ->all();
        $features = [
            'lead' => ['label' => 'All features', 'href' => '/features'],
            'items' => $featureItems,
        ];

        // @vitejs/plugin-react needs its dev preamble before islands.tsx loads;
        // Statamic's {{ vite }} tag doesn't emit it. Empty string in prod.
        View::share('vite_react_refresh', (string) Vite::reactRefresh());

        View::share('claryeo_app_url', $appUrl);
        View::share('waitlist_mode', $waitlistMode);
        View::share('primary_cta', $primaryCta);
        // Header chrome: 'dark' lets a page sit the header over a full-bleed
        // dark hero (landing only); everything else keeps the solid header.
        View::share('nav_theme', 'light');

        // JSON props for the header island (Features + Resources mega-menus).
        View::share('nav_props', htmlspecialchars(
            (string) json_encode([
                'appUrl' => $appUrl,
                'primary' => $primaryLinks,
                'features' => $features,
                'resources' => $nav['resources'] ?? [],
                'waitlistMode' => $waitlistMode,
                'cta' => $primaryCta,
            ]),
            ENT_QUOTES,
            'UTF-8'
        ));

        // JSON props for the closing-CTA island (partials/cta). Copy is passed
        // as data attributes by the partial; only the links come from here.
        View::share('cta_props', htmlspecialchars(
            (string) json_encode([
                'primary' => $primaryCta,
                'secondary' => $waitlistMode
                    ? null
                    : ['label' => 'Join the waitlist', 'href' => '/waitlist'],
            ]),
            ENT_QUOTES,
            'UTF-8'
        ));

        // Arrays for the server-rendered Antlers footer + nav fallback.
        View::share('nav_primary', $primaryLinks);
        View::share('footer_groups', $this->footerGroups($nav['footer'] ?? [], $waitlistMode));
        View::share('footer_socials', $nav['social'] ?? []);

        // Blog category chips. Antlers can't iterate an associative array as
        // key/value pairs, so expose a list of {key, value} entries.
        $blogCategories = [];
        foreach (Config::array('marketing.blog_categories', []) as $slug => $title) {
            $blogCategories[] = ['key' => $slug, 'value' => $title];
        }
        View::share('blog_categories', $blogCategories);

        // Popularity-ranked "Top Reads" for the blog index.
        View::composer('blog.index', BlogIndexComposer::class);
    }

    /**
     * Footer link groups, with pricing/get-started swapped for the waitlist when
     * waitlist mode is on.
     *
     * @param  array<int, array{group: string, items: array<int, array{title: string, href: string}>}>  $groups
     * @return array<int, array{group: string, items: array<int, array{title: string, href: string}>}>
     */
    private function footerGroups(array $groups, bool $waitlistMode): array
    {
        if (! $waitlistMode) {
            return $groups;
        }

        return array_map(function (array $group): array {
            $items = array_values(array_filter(
                $group['items'],
                static fn (array $item): bool => ! in_array($item['href'], ['/pricing', '/get-started'], true),
            ));

            if ($group['group'] === 'Product') {
                array_unshift($items, ['title' => 'Join the waitlist', 'href' => '/waitlist']);
            }

            $group['items'] = $items;

            return $group;
        }, $groups);
    }
}
