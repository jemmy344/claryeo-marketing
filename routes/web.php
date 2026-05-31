<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\GetStartedController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\TaxCalculatorController;
use App\Http\Controllers\WaitlistController;
use Illuminate\Support\Facades\Route;

Route::get('/', LandingController::class)->name('home');

Route::get('pricing', PricingController::class)->middleware('waitlist.redirect')->name('pricing');

Route::view('features', 'features', [
    'title' => 'Features — Claryeo',
    'meta_description' => 'Invoicing, expense tracking, tax calculations, client management, and financial reports — all the tools freelancers need in one place.',
])->name('features');

Route::view('about', 'about', [
    'title' => 'About — Claryeo',
    'meta_description' => "Learn about Claryeo's mission to simplify invoicing, expenses, and tax for freelancers and small businesses everywhere.",
])->name('about');

Route::get('get-started', GetStartedController::class)->middleware('waitlist.redirect')->name('get-started');

Route::get('tax-calculator', [TaxCalculatorController::class, 'show'])->name('taxCalculator');
Route::post('tax-calculator/report', [TaxCalculatorController::class, 'report'])->middleware('throttle:6,1')->name('taxCalculator.report.store');

Route::get('contact', [ContactController::class, 'show'])->name('contact');
Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:6,1')->name('contact.store');
Route::view('contact/thank-you', 'contact.thank-you', ['title' => 'Thank you — Claryeo'])->name('contact.thank-you');

Route::get('waitlist', [WaitlistController::class, 'show'])->name('waitlist');
Route::post('waitlist', [WaitlistController::class, 'store'])->middleware('throttle:6,1')->name('waitlist.store');
Route::view('waitlist/thank-you', 'waitlist.thank-you', ['title' => "You're on the list — Claryeo"])->name('waitlist.thank-you');

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
