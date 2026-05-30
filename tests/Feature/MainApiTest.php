<?php

namespace Tests\Feature;

use App\Services\MainApi;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class MainApiTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config()->set('services.main_api.url', 'http://web.test');
        config()->set('services.main_api.token', 'secret-token');
    }

    public function test_pricing_sends_token_and_unwraps_data(): void
    {
        Http::fake([
            'web.test/api/internal/pricing' => Http::response(['data' => ['plans' => [['key' => 'free']]]]),
        ]);

        $pricing = app(MainApi::class)->pricing();

        $this->assertSame([['key' => 'free']], $pricing['plans']);
        Http::assertSent(fn (Request $request): bool => $request->hasHeader('X-Internal-Token', 'secret-token')
            && $request->url() === 'http://web.test/api/internal/pricing');
    }

    public function test_legal_document_unwraps_data(): void
    {
        Http::fake([
            'web.test/api/internal/legal/privacy' => Http::response(['data' => ['body' => '# Privacy', 'version' => '2.1.1']]),
        ]);

        $doc = app(MainApi::class)->legalDocument('privacy');

        $this->assertSame('2.1.1', $doc['version']);
    }

    public function test_get_serves_fallback_when_api_fails(): void
    {
        Http::fake(['web.test/api/internal/legal/privacy' => Http::response('', 500)]);

        $this->assertNull(app(MainApi::class)->legalDocument('privacy'));
    }

    public function test_submit_contact_posts_payload_with_token(): void
    {
        Http::fake(['web.test/api/internal/contact' => Http::response(['data' => ['id' => 1]], 201)]);

        $response = app(MainApi::class)->submitContact([
            'email' => 'ada@example.com',
            'message' => 'I would like help with my team account.',
        ]);

        $this->assertSame(201, $response->status());
        Http::assertSent(fn (Request $request): bool => $request['email'] === 'ada@example.com'
            && $request->hasHeader('X-Internal-Token', 'secret-token')
            && $request->url() === 'http://web.test/api/internal/contact');
    }
}
