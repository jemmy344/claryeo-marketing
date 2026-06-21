<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Waitlist mode
    |--------------------------------------------------------------------------
    | Mirrors the main app's WAITLIST_MODE. When true: every CTA points at the
    | waitlist instead of get-started, and pricing is hidden + unreachable
    | (routes redirect to the waitlist). Keep this in sync with the main app.
    */
    'waitlist_mode' => (bool) env('WAITLIST_MODE', false),

    /*
    |--------------------------------------------------------------------------
    | Blog categories
    |--------------------------------------------------------------------------
    | slug => display title. Mirrors the `category` taxonomy terms; used to
    | render the blog filter chips and validate /blog/category/{slug}.
    */
    'blog_categories' => [
        'tax' => 'Tax & compliance',
        'invoicing' => 'Invoicing',
        'expenses' => 'Expenses',
        'business' => 'Running a business',
        'product' => 'Product updates',
    ],

    /*
    |--------------------------------------------------------------------------
    | Blog view tracking
    |--------------------------------------------------------------------------
    | Powers the popularity-ranked "Top Reads" block. View counts are stored
    | internally (SQLite) and never shown to visitors. Disable in environments
    | where you don't want to record views (e.g. local development).
    */
    'view_tracking' => (bool) env('BLOG_VIEW_TRACKING', true),
];
