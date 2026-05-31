<?php

namespace Tests\Feature;

use Tests\TestCase;

class AboutPageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_about_page_renders_island(): void
    {
        $this->get('/about')
            ->assertOk()
            ->assertSee('data-island="about"', false);
    }
}
