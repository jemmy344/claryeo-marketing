<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CaptureUtmParameters;
use App\Services\MainApi;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __construct(private readonly MainApi $api) {}

    public function show(): View
    {
        return view('contact', [
            'title' => 'Contact — Claryeo',
            'meta_description' => 'Get in touch with the Claryeo team.',
        ]);
    }

    /**
     * Proxy the submission to the main app's internal API and relay its
     * response (201 on success, 422 with validation errors) to the island.
     */
    public function store(Request $request): JsonResponse
    {
        $payload = [
            ...$request->only(['first_name', 'last_name', 'email', 'message']),
            ...CaptureUtmParameters::resolve($request),
            'client_ip' => $request->ip(),
            'client_user_agent' => $request->userAgent(),
        ];

        $response = $this->api->submitContact($payload);

        return response()->json($response->json() ?? [], $response->status());
    }
}
