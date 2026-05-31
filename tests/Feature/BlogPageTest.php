<?php

namespace Tests\Feature;

use Tests\TestCase;

class BlogPageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_index_lists_published_posts(): void
    {
        $this->get('/blog')
            ->assertOk()
            ->assertSee('The Claryeo blog')
            ->assertSee('VAT for Nigerian small businesses')
            ->assertSee('5 invoicing mistakes that delay your payments');
    }

    public function test_category_filters_to_matching_posts(): void
    {
        $response = $this->get('/blog/category/invoicing');

        $response->assertOk()
            ->assertSee('5 invoicing mistakes that delay your payments')
            ->assertDontSee('VAT for Nigerian small businesses');
    }

    public function test_unknown_category_is_not_found(): void
    {
        $this->get('/blog/category/does-not-exist')->assertNotFound();
    }

    public function test_single_post_renders_content(): void
    {
        $this->get('/blog/vat-for-nigerian-small-businesses')
            ->assertOk()
            ->assertSee('VAT for Nigerian small businesses')
            ->assertSee('Back to the blog')
            // markdown body rendered to HTML
            ->assertSee('Do you even need to charge VAT?');
    }

    public function test_unknown_post_is_not_found(): void
    {
        $this->get('/blog/nope')->assertNotFound();
    }
}
