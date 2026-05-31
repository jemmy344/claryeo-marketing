<?php

namespace App\Providers;

use App\Services\MainApi;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\View;
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
        /** @var array<string, array{slug: string, title: mixed, tagline: mixed, badge?: mixed, icon?: mixed}> $featurePages */
        $featurePages = Config::array('feature_pages', []);
        $featureItems = collect($featurePages)
            ->map(fn (array $f): array => [
                'title' => $f['title'],
                'tagline' => $f['tagline'],
                'href' => '/features/'.$f['slug'],
                'icon' => $f['icon'] ?? 'Sparkles',
                'badge' => $f['badge'] ?? null,
            ])
            ->values()
            ->all();
        $features = [
            'lead' => ['label' => 'All features', 'href' => '/features'],
            'items' => $featureItems,
        ];

        View::share('claryeo_app_url', $appUrl);
        View::share('waitlist_mode', $waitlistMode);
        View::share('primary_cta', $primaryCta);

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

        // Arrays for the server-rendered Antlers footer + nav fallback.
        View::share('nav_primary', $primaryLinks);
        View::share('footer_groups', $this->footerGroups($nav['footer'] ?? [], $waitlistMode));
        View::share('footer_socials', $nav['social'] ?? []);

        // Blog category chips (slug => title).
        View::share('blog_categories', Config::array('marketing.blog_categories', []));
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
