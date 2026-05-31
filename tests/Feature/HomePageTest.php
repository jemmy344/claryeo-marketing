<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        config()->set('services.main_api.url', 'http://web.test');
        config()->set('services.main_api.token', 'secret');
    }

    public function test_home_renders_landing_island_with_plans(): void
    {
        Http::fake([
            'web.test/api/internal/pricing' => Http::response(['data' => [
                'plans' => [
                    ['key' => 'free', 'name' => 'Free'],
                    ['key' => 'growth', 'name' => 'Growth'],
                ],
                'comparisonMatrix' => [],
                'comparisonAddOns' => [],
            ]]),
        ]);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertSee('data-island="landing"', false);

        preg_match('/data-island="landing"\s+data-props="([^"]*)"/', $response->getContent(), $matches);
        $props = json_decode(html_entity_decode($matches[1], ENT_QUOTES, 'UTF-8'), true);
        $this->assertCount(2, $props['plans']);
        $this->assertFalse($props['waitlistMode']);
    }

    public function test_home_renders_when_api_unavailable(): void
    {
        Http::fake(['web.test/api/internal/pricing' => Http::response('', 500)]);

        $this->get('/')
            ->assertOk()
            ->assertSee('data-island="landing"', false);
    }
}
