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
            'title' => 'Pricing — Claryeo',
            'meta_description' => 'Simple, transparent pricing for Claryeo. Choose the plan that fits your business.',
            'island_props' => json_encode([
                'plans' => $pricing['plans'] ?? [],
                'getStartedUrl' => '/get-started',
                'contactUrl' => '/contact',
            ]),
        ]);
    }
}
