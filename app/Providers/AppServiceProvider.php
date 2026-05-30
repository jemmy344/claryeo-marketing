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
        View::share('claryeo_app_url', (string) config('services.claryeo_app.url'));
    }
}
