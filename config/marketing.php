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
];
