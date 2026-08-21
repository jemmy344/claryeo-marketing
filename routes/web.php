<?php

use App\Http\Controllers\BlogViewController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\GetStartedController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\TaxCalculatorController;
use App\Http\Controllers\WaitlistController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingController::class)->name('home');

Route::get('pricing', PricingController::class)->middleware('waitlist.redirect')->name('pricing');

Route::get('features', [FeatureController::class, 'index'])->name('features');
Route::get('features/{slug}', [FeatureController::class, 'show'])->name('features.show');

// Records a session-deduped view for the "Top Reads" ranking. Hit by a small
// client-side beacon on the post page; a distinct path from Statamic's native
// GET /blog/{slug} so there is no routing conflict.
Route::post('blog/{id}/view', BlogViewController::class)
    ->middleware('throttle:30,1')
    ->name('blog.view');

// Blog index + category filter. Individual posts (/blog/{slug}) are served
// natively by the Statamic `blog` collection route (template: blog/show).
Route::view('blog', 'blog.index', [
    'title' => 'Blog | Claryeo',
    'meta_description' => 'Practical guides on invoicing, expenses, bank sync, and Nigerian tax for freelancers and small businesses.',
    'activeCategory' => null,
])->name('blog');

Route::get('blog/category/{category}', function (string $category) {
    /** @var array<string, string> $categories */
    $categories = (array) config('marketing.blog_categories', []);

    abort_unless(array_key_exists($category, $categories), 404);

    return view('blog.index', [
        'title' => $categories[$category].' | Claryeo blog',
        'meta_description' => 'Claryeo blog posts on '.$categories[$category].'.',
        'activeCategory' => $category,
    ]);
})->name('blog.category');

Route::view('about', 'about', [
    'title' => 'About | Claryeo',
    'meta_description' => "Learn about Claryeo's mission to simplify invoicing, expenses, and tax for freelancers and small businesses everywhere.",
])->name('about');

// Guides index. Individual guides (/guides/{slug}) are served natively by the
// Statamic `guides` collection route (template: guides/show).
Route::view('guides', 'guides.index', [
    'title' => 'Nigerian Tax & Invoicing Guides (2026) | Claryeo',
    'meta_description' => 'Long-form guides on PAYE, freelancer tax, small business tax (CIT and VAT), and invoicing in Nigeria. Written for the 2026 tax rules.',
])->name('guides');

Route::get('get-started', GetStartedController::class)->middleware('waitlist.redirect')->name('get-started');

Route::get('tax-calculator', [TaxCalculatorController::class, 'show'])->name('taxCalculator');
Route::post('tax-calculator/report', [TaxCalculatorController::class, 'report'])->middleware('throttle:6,1')->name('taxCalculator.report.store');

Route::get('contact', [ContactController::class, 'show'])->name('contact');
Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:6,1')->name('contact.store');
Route::view('contact/thank-you', 'contact.thank-you', ['title' => 'Thank you | Claryeo'])->name('contact.thank-you');

Route::get('waitlist', [WaitlistController::class, 'show'])->name('waitlist');
Route::post('waitlist', [WaitlistController::class, 'store'])->middleware('throttle:6,1')->name('waitlist.store');
Route::view('waitlist/thank-you', 'waitlist.thank-you', ['title' => "You're on the list | Claryeo"])->name('waitlist.thank-you');

/*
| Legal pages. Content + versioning are owned by the main Claryeo app and
| fetched via its internal API; these routes preserve the existing public
| slugs (/privacy, /terms, /cookies) so SEO and backlinks survive the split.
*/
foreach (['privacy', 'terms', 'cookies'] as $slug) {
    Route::get($slug.'/versions', [LegalController::class, 'versions'])
        ->defaults('slug', $slug)
        ->name($slug.'.versions');

    Route::get($slug, [LegalController::class, 'show'])
        ->defaults('slug', $slug)
        ->name($slug);

    Route::get($slug.'/{version}', [LegalController::class, 'show'])
        ->defaults('slug', $slug)
        ->name($slug.'.version');
}

/*
| SEO: an XML sitemap of the public marketing surface (static slugs from config
| + published blog posts via the Statamic collection tag) and a host-aware
| robots.txt that only invites crawlers in production.
*/
Route::get('sitemap.xml', function () {
    $urls = ['/', '/features', '/about', '/tax-calculator', '/contact', '/blog', '/guides'];

    foreach (array_keys((array) config('feature_pages', [])) as $slug) {
        $urls[] = '/features/'.$slug;
    }

    foreach (array_keys((array) config('marketing.blog_categories', [])) as $category) {
        $urls[] = '/blog/category/'.$category;
    }

    foreach (['privacy', 'terms', 'cookies'] as $slug) {
        $urls[] = '/'.$slug;
    }

    if (config('marketing.waitlist_mode')) {
        $urls[] = '/waitlist';
    } else {
        $urls[] = '/pricing';
        $urls[] = '/get-started';
    }

    return response()
        ->view('sitemap', ['urls' => array_map(fn (string $path): string => url($path), $urls)])
        ->header('Content-Type', 'application/xml');
})->name('sitemap');

Route::get('robots.txt', function () {
    $lines = app()->environment('production')
        ? ['User-agent: *', 'Allow: /', '', 'Sitemap: '.url('/sitemap.xml')]
        : ['User-agent: *', 'Disallow: /'];

    return response(implode("\n", $lines)."\n")->header('Content-Type', 'text/plain');
})->name('robots');
