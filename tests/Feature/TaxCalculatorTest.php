<?php

namespace Tests\Feature;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class TaxCalculatorTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        config()->set('services.main_api.url', 'http://web.test');
        config()->set('services.main_api.token', 'secret');
    }

    public function test_page_renders_calculator_island(): void
    {
        $this->get('/tax-calculator')
            ->assertOk()
            ->assertSee('data-island="tax-calculator"', false);
    }

    public function test_report_proxies_to_internal_api_with_attribution(): void
    {
        Http::fake([
            'web.test/api/internal/tax-calculator/report' => Http::response([
                'message' => 'Sent.',
                'data' => ['sent_to_masked' => 'a***@example.com'],
            ]),
        ]);

        $response = $this->postJson('/tax-calculator/report', [
            'email' => 'ada@example.com',
            'consent_contact' => true,
            'document_type' => 'tax_calculator_estimate',
            'payload' => ['calculator_mode' => 'employee_paye'],
        ]);

        $response->assertOk()->assertJsonPath('data.sent_to_masked', 'a***@example.com');

        Http::assertSent(fn (Request $request): bool => $request['email'] === 'ada@example.com'
            && $request->hasHeader('X-Internal-Token', 'secret')
            && $request['client_ip'] !== null);
    }

    public function test_report_relays_validation_errors(): void
    {
        Http::fake([
            'web.test/api/internal/tax-calculator/report' => Http::response([
                'message' => 'Invalid.',
                'errors' => ['consent_contact' => ['Please confirm.']],
            ], 422),
        ]);

        $this->postJson('/tax-calculator/report', ['email' => 'ada@example.com'])
            ->assertStatus(422)
            ->assertJsonPath('errors.consent_contact.0', 'Please confirm.');
    }
}
