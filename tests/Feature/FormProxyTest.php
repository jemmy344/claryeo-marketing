<?php

namespace Tests\Feature;

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class FormProxyTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        config()->set('services.main_api.url', 'http://web.test');
        config()->set('services.main_api.token', 'secret');
        config()->set('services.claryeo_app.url', 'https://app-staging.claryeo.com');
    }

    public function test_contact_page_renders_island(): void
    {
        $this->get('/contact')->assertOk()->assertSee('data-island="contact-form"', false);
    }

    public function test_contact_store_proxies_and_relays_success(): void
    {
        Http::fake(['web.test/api/internal/contact' => Http::response(['data' => ['id' => 7]], 201)]);

        $response = $this->postJson('/contact', [
            'email' => 'ada@example.com',
            'message' => 'Hello team, I would like help with my account.',
        ]);

        $response->assertCreated()->assertJsonPath('data.id', 7);

        Http::assertSent(fn (Request $request): bool => $request['email'] === 'ada@example.com'
            && $request->hasHeader('X-Internal-Token', 'secret')
            && $request['client_ip'] !== null);
    }

    public function test_contact_store_relays_validation_errors(): void
    {
        Http::fake(['web.test/api/internal/contact' => Http::response([
            'message' => 'The email field must be a valid email address.',
            'errors' => ['email' => ['The email field must be a valid email address.']],
        ], 422)]);

        $this->postJson('/contact', ['email' => 'not-an-email'])
            ->assertStatus(422)
            ->assertJsonPath('errors.email.0', 'The email field must be a valid email address.');
    }

    public function test_waitlist_store_proxies_success(): void
    {
        Http::fake(['web.test/api/internal/waitlist' => Http::response(['data' => ['id' => 3]], 201)]);

        $this->postJson('/waitlist', ['email' => 'wait@example.com'])->assertCreated();

        Http::assertSent(fn (Request $request): bool => $request['email'] === 'wait@example.com'
            && $request->hasHeader('X-Internal-Token', 'secret'));
    }

    public function test_get_started_redirects_to_app_with_plan(): void
    {
        $this->get('/get-started?plan=growth&billing_interval=annual')
            ->assertRedirect('https://app-staging.claryeo.com/start?plan=growth&billing_interval=annual');
    }

    public function test_get_started_redirects_without_plan(): void
    {
        $this->get('/get-started')->assertRedirect('https://app-staging.claryeo.com/start');
    }
}
