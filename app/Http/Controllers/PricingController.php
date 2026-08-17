<?php

namespace App\Http\Controllers;

use App\Services\MainApi;
use Illuminate\Contracts\View\View;

class PricingController extends Controller
{
    public function __construct(private readonly MainApi $api) {}

    /**
     * Render the pricing page. The plan catalog is owned by the main app and
     * fetched (server-side, cached) via the internal API, then handed to the
     * interactive pricing island.
     */
    public function __invoke(): View
    {
        $pricing = $this->api->pricing();

        return view('pricing', [
            'title' => 'Pricing | Claryeo',
            'meta_description' => 'Simple, transparent pricing for Claryeo. Choose the plan that fits your business.',
            // HTML-escape the JSON so its structural double quotes become
            // &quot; and survive embedding in a double-quoted HTML attribute
            // (Antlers does not escape interpolated values here). The browser
            // un-escapes the attribute before the island's JSON.parse runs.
            'island_props' => htmlspecialchars(
                (string) json_encode([
                    'plans' => $pricing['plans'] ?? [],
                    'comparisonMatrix' => $pricing['comparisonMatrix'] ?? [],
                    'comparisonAddOns' => $pricing['comparisonAddOns'] ?? [],
                    'getStartedUrl' => '/get-started',
                    'contactUrl' => '/contact',
                ]),
                ENT_QUOTES,
                'UTF-8'
            ),
        ]);
    }
}
