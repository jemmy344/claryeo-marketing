<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GetStartedController extends Controller
{
    /**
     * Cross-domain plan handoff: forward the chosen plan to the main app's
     * /start endpoint, which validates it, stores it (PlanMemoryService), and
     * routes the user into registration/billing. Marketing keeps no plan state.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $params = array_filter([
            'plan' => $request->string('plan')->value(),
            'billing_interval' => $request->string('billing_interval')->value(),
        ], static fn (string $value): bool => $value !== '');

        $url = rtrim((string) config('services.claryeo_app.url'), '/').'/start';

        if ($params !== []) {
            $url .= '?'.http_build_query($params);
        }

        return redirect()->away($url);
    }
}
