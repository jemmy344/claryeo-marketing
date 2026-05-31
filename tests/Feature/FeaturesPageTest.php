<?php

namespace Tests\Feature;

use Tests\TestCase;

class FeaturesPageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_features_page_renders_island(): void
    {
        $this->get('/features')
            ->assertOk()
            ->assertSee('data-island="features"', false);
    }
}
