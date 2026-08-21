<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    /*
    | Analytics. Injected server-side via the Antlers shell because the Docker
    | assets stage receives no VITE_* vars, so import.meta.env keys are empty
    | in production bundles. GA4 property is shared with the main Claryeo app.
    */
    'ga4' => [
        'measurement_id' => env('GA4_MEASUREMENT_ID'),
    ],

    'posthog' => [
        'key' => env('POSTHOG_KEY'),
        'host' => env('POSTHOG_HOST', 'https://eu.i.posthog.com'),
    ],

    /*
    | The main Claryeo Laravel app's internal API. The marketing site reaches it
    | over Railway private networking (web.railway.internal) and authenticates
    | with a shared secret. All dynamic data (pricing, legal, lead capture) flows
    | through this — the marketing app has no database of its own for app data.
    */
    'main_api' => [
        'url' => env('MAIN_API_URL', 'http://web.railway.internal:8080'),
        'token' => env('INTERNAL_API_TOKEN'),
    ],

    /*
    | Public URL of the authenticated Claryeo app (app.claryeo.com). Used for
    | log-in / dashboard links and the get-started plan handoff.
    */
    'claryeo_app' => [
        'url' => env('CLARYEO_APP_URL', 'https://app.claryeo.com'),
    ],

];
