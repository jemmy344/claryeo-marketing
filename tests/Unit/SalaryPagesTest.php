<?php

namespace Tests\Unit;

use App\Support\SalaryPages;
use Tests\TestCase;

class SalaryPagesTest extends TestCase
{
    public function test_all_returns_list_of_salary_pages(): void
    {
        $pages = SalaryPages::all();

        $this->assertNotEmpty($pages);
        $this->assertIsArray($pages[0]);
        $this->assertArrayHasKey('slug', $pages[0]);
    }

    public function test_find_returns_page_by_slug_in_constant_time(): void
    {
        $slugs = SalaryPages::slugs();
        $this->assertNotEmpty($slugs);

        $targetSlug = $slugs[0];
        $page = SalaryPages::find($targetSlug);

        $this->assertNotNull($page);
        $this->assertSame($targetSlug, $page['slug']);
    }

    public function test_find_returns_null_for_non_existent_slug(): void
    {
        $this->assertNull(SalaryPages::find('non-existent-salary-page-slug-12345'));
    }

    public function test_slugs_returns_non_empty_list_matching_all_pages(): void
    {
        $slugs = SalaryPages::slugs();
        $pages = SalaryPages::all();

        $this->assertCount(count($pages), $slugs);
        $this->assertSame($pages[0]['slug'], $slugs[0]);
    }
}
