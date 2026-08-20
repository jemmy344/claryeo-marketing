<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CaptureUtmParameters;
use App\Services\MainApi;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaxCalculatorController extends Controller
{
    public function __construct(private readonly MainApi $api) {}

    public function show(): View
    {
        return view('tax-calculator', [
            'title' => 'Nigerian tax calculator | Claryeo',
            'meta_description' => 'Estimate your Nigerian PAYE or business tax in seconds, then email yourself the full breakdown.',
        ]);
    }

    /**
     * Proxy the (client-computed) estimate to the main app's internal API,
     * which emails the breakdown and stores the lead. Adds attribution.
     */
    public function report(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'consent_contact' => ['required', 'accepted'],
            'consent_marketing' => ['nullable', 'boolean'],
            'document_type' => ['nullable', 'string', 'max:255'],
            'payload' => ['required', 'array'],
        ]);

        $payload = [
            ...$validated,
            ...CaptureUtmParameters::resolve($request),
            'client_ip' => $request->ip(),
            'client_user_agent' => $request->userAgent(),
        ];

        $response = $this->api->submitTaxReport($payload);

        return response()->json($response->json() ?? [], $response->status());
    }
}
