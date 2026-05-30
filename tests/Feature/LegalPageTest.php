<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class LegalPageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        config()->set('services.main_api.url', 'http://web.test');
        config()->set('services.main_api.token', 'secret');
    }

    public function test_privacy_page_renders_markdown_from_api(): void
    {
        Http::fake([
            'web.test/api/internal/legal/privacy' => Http::response(['data' => [
                'body' => "## Section one\n\nHello from the policy.",
                'meta' => ['effective_date' => '2026-03-19'],
                'version' => '2.1.1',
            ]]),
        ]);

        $response = $this->get('/privacy');

        $response->assertOk();
        $response->assertSee('Privacy Policy', false);
        $response->assertSee('Hello from the policy.', false);
        $response->assertSee('Effective 2026-03-19', false);
        $response->assertSee('Section one', false);
    }

    public function test_versions_page_lists_versions_with_current_badge(): void
    {
        Http::fake([
            'web.test/api/internal/legal/terms/versions' => Http::response(['data' => [
                'currentVersion' => '2.0.0',
                'versions' => [
                    ['version' => '2.0.0', 'effective_date' => '2026-01-10', 'status' => 'active'],
                    ['version' => '1.0.0', 'effective_date' => '2024-01-01', 'status' => 'archived'],
                ],
            ]]),
        ]);

        $response = $this->get('/terms/versions');

        $response->assertOk();
        $response->assertSee('Version 2.0.0', false);
        $response->assertSee('Version 1.0.0', false);
        $response->assertSee('Current', false);
    }

    public function test_unknown_legal_slug_is_not_found(): void
    {
        $this->get('/totally-unknown-page')->assertNotFound();
    }

    public function test_api_failure_renders_not_found(): void
    {
        Http::fake(['web.test/api/internal/legal/privacy' => Http::response('', 500)]);

        $this->get('/privacy')->assertNotFound();
    }
}
