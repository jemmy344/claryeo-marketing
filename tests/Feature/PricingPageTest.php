<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class PricingPageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        config()->set('services.main_api.url', 'http://web.test');
        config()->set('services.main_api.token', 'secret');
    }

    public function test_pricing_page_renders_island_with_plan_data(): void
    {
        Http::fake([
            'web.test/api/internal/pricing' => Http::response(['data' => [
                'plans' => [
                    ['key' => 'free', 'name' => 'Free', 'priceLabel' => 'NGN 0', 'entitlementBullets' => ['10 invoices']],
                    ['key' => 'growth', 'name' => 'Growth', 'monthlyPriceLabel' => 'NGN 5,000 / mo', 'badgeLabel' => 'Popular'],
                ],
                'comparisonMatrix' => [],
                'comparisonAddOns' => [],
            ]]),
        ]);

        $response = $this->get('/pricing');

        $response->assertOk();
        $response->assertSee('Simple, transparent pricing', false);
        $response->assertSee('data-island="pricing"', false);
        $response->assertSee('growth', false);
    }

    public function test_pricing_page_renders_when_api_unavailable(): void
    {
        Http::fake(['web.test/api/internal/pricing' => Http::response('', 500)]);

        $response = $this->get('/pricing');

        $response->assertOk();
        $response->assertSee('data-island="pricing"', false);
    }
}
