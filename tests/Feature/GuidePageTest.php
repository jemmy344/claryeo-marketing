<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class GuidePageTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    /**
     * @return array<string, array{0: string, 1: string}>
     */
    public static function guideSlugs(): array
    {
        return [
            'paye' => ['paye-tax-nigeria', 'PAYE Tax in Nigeria'],
            'small business' => ['small-business-tax-nigeria', 'Small Business Tax in Nigeria'],
            'freelancer' => ['freelancer-tax-nigeria', 'How Freelancers Pay Tax in Nigeria'],
            'invoice' => ['invoice-guide-nigeria', 'How to Create Professional Invoices in Nigeria'],
        ];
    }

    /**
     * Guides are Statamic entries rendered server-side (no island), so the body
     * has to be in the HTML: that is the whole point for search and AI crawlers.
     */
    #[DataProvider('guideSlugs')]
    public function test_guide_renders_server_side(string $slug, string $heading): void
    {
        $this->get("/guides/{$slug}")
            ->assertOk()
            ->assertSee($heading, false)
            ->assertSee('Frequently Asked Questions', false)
            ->assertSee('"@type": "Article"', false);
    }

    public function test_index_lists_every_guide(): void
    {
        $response = $this->get('/guides')->assertOk();

        foreach (self::guideSlugs() as [$slug, $heading]) {
            $response->assertSee('/guides/'.$slug, false);
            $response->assertSee($heading, false);
        }
    }

    public function test_unknown_guide_is_not_found(): void
    {
        $this->get('/guides/does-not-exist')->assertNotFound();
    }
}
