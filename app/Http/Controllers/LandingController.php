<?php

namespace App\Http\Controllers;

use App\Services\MainApi;
use Illuminate\Contracts\View\View;

class LandingController extends Controller
{
    public function __construct(private readonly MainApi $api) {}

    /**
     * Marketing home page. The plan catalog (for the pricing showcase section)
     * is owned by the main app and fetched server-side via the internal API.
     */
    public function __invoke(): View
    {
        $pricing = $this->api->pricing();

        return view('landing', [
            'title' => 'Claryeo — Invoicing, expenses & tax for freelancers everywhere',
            'meta_description' => 'Manage invoices, track expenses, and handle tax obligations in one simple platform built for freelancers and small businesses.',
            'island_props' => htmlspecialchars(
                (string) json_encode([
                    'plans' => $pricing['plans'] ?? [],
                    'showLogoCloud' => false,
                    'waitlistMode' => false,
                ]),
                ENT_QUOTES,
                'UTF-8'
            ),
        ]);
    }
}
