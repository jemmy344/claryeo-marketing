<?php

namespace Tests\Feature;

use App\Providers\AppServiceProvider;
use Tests\TestCase;

class WaitlistModeTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        config()->set('marketing.waitlist_mode', true);
        // Re-run the provider's shared view data with waitlist mode on.
        $this->app->forgetInstance(AppServiceProvider::class);
        (new AppServiceProvider($this->app))->boot();
    }

    public function test_pricing_redirects_to_waitlist(): void
    {
        $this->get('/pricing')->assertRedirect('/waitlist');
    }

    public function test_get_started_redirects_to_waitlist(): void
    {
        $this->get('/get-started')->assertRedirect('/waitlist');
    }

    public function test_nav_cta_points_at_waitlist(): void
    {
        $response = $this->get('/about');

        $response->assertOk();
        // The server-rendered nav fallback CTA + the island props both reflect waitlist mode.
        $response->assertSee('Join the waitlist', false);
        $response->assertSee('&quot;waitlistMode&quot;:true', false);
    }
}
