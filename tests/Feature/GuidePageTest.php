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
     * @return array<string, array{0: string}>
     */
    public static function guideSlugs(): array
    {
        return [
            'paye' => ['paye-tax-nigeria'],
            'small business' => ['small-business-tax-nigeria'],
            'freelancer' => ['freelancer-tax-nigeria'],
            'invoice' => ['invoice-guide-nigeria'],
        ];
    }

    #[DataProvider('guideSlugs')]
    public function test_guide_renders_its_island(string $slug): void
    {
        $this->get("/guides/{$slug}")
            ->assertOk()
            ->assertSee('data-island="guide-'.$slug.'"', false);
    }

    public function test_unknown_guide_is_not_found(): void
    {
        $this->get('/guides/does-not-exist')->assertNotFound();
    }
}
