<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CaptureUtmParameters;
use App\Services\MainApi;
use App\Support\Faqs;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaxCalculatorController extends Controller
{
    public function __construct(private readonly MainApi $api) {}

    public function show(): View
    {
        return view('tax-calculator', [
            'title' => 'Nigerian Tax Calculator 2026: PAYE, PIT & CIT | Claryeo',
            'meta_description' => 'Estimate your Nigerian PAYE or business tax in seconds on the 2026 tax bands, then email yourself the full breakdown. Free, no signup.',
            // Server-rendered fallback content + FAQPage schema.
            'faqs' => Faqs::get('taxCalculator'),
        ]);
    }

    /**
     * Proxy the (client-computed) estimate to the main app's internal API,
     * which emails the breakdown and stores the lead. Adds attribution.
     */
    public function report(Request $request): JsonResponse
    {
        $payload = [
            ...$request->all(),
            ...CaptureUtmParameters::resolve($request),
            'client_ip' => $request->ip(),
            'client_user_agent' => $request->userAgent(),
        ];

        $response = $this->api->submitTaxReport($payload);

        return response()->json($response->json() ?? [], $response->status());
    }
}
