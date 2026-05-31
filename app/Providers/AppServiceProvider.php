<?php

namespace App\Providers;

use App\Services\MainApi;
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
        $appUrl = (string) config('services.claryeo_app.url');
        $nav = config('marketing_nav');

        View::share('claryeo_app_url', $appUrl);

        // JSON props for the header island (primary links + Resources mega-menu).
        View::share('nav_props', htmlspecialchars(
            (string) json_encode([
                'appUrl' => $appUrl,
                'primary' => $nav['primary'] ?? [],
                'resources' => $nav['resources'] ?? [],
            ]),
            ENT_QUOTES,
            'UTF-8'
        ));

        // Arrays for the server-rendered Antlers footer + nav fallback.
        View::share('nav_primary', $nav['primary'] ?? []);
        View::share('footer_groups', $nav['footer'] ?? []);
        View::share('footer_socials', $nav['social'] ?? []);
    }
}
