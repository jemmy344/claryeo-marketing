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
                'comparisonMatrix' => [
                    ['title' => 'Core', 'rows' => [
                        ['key' => 'invoices', 'label' => 'Invoices', 'description' => '', 'free' => ['kind' => 'text', 'value' => '10'], 'growth' => ['kind' => 'included'], 'pro' => ['kind' => 'included'], 'enterprise' => ['kind' => 'included']],
                    ]],
                ],
                'comparisonAddOns' => [
                    ['key' => 'single_bank_link', 'label' => 'Bank link', 'free' => ['kind' => 'text', 'value' => 'N3,500'], 'growth' => ['kind' => 'text', 'value' => 'N3,500'], 'pro' => ['kind' => 'included'], 'enterprise' => ['kind' => 'included']],
                ],
            ]]),
        ]);

        $response = $this->get('/pricing');

        $response->assertOk();
        $response->assertSee('Simple, transparent pricing', false);
        $response->assertSee('data-island="pricing"', false);
        $response->assertSee('growth', false);

        // The props must be HTML-escaped so the attribute is not broken by the
        // JSON's own double quotes — extract it and confirm it decodes to the
        // plan catalog the island expects. (Regression: raw quotes truncated
        // the attribute and the island hydrated with empty props.)
        $html = $response->getContent();
        $this->assertMatchesRegularExpression(
            '/data-island="pricing"\s+data-props="([^"]*)"/',
            $html
        );
        preg_match('/data-island="pricing"\s+data-props="([^"]*)"/', $html, $matches);
        $decoded = json_decode(html_entity_decode($matches[1], ENT_QUOTES, 'UTF-8'), true);
        $this->assertIsArray($decoded);
        $this->assertCount(2, $decoded['plans']);
        $this->assertSame('Growth', $decoded['plans'][1]['name']);
        $this->assertSame('Core', $decoded['comparisonMatrix'][0]['title']);
        $this->assertSame('single_bank_link', $decoded['comparisonAddOns'][0]['key']);
        $this->assertSame('/get-started', $decoded['getStartedUrl']);
    }

    public function test_pricing_page_renders_when_api_unavailable(): void
    {
        Http::fake(['web.test/api/internal/pricing' => Http::response('', 500)]);

        $response = $this->get('/pricing');

        $response->assertOk();
        $response->assertSee('data-island="pricing"', false);
    }
}
