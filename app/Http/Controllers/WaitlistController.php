<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CaptureUtmParameters;
use App\Services\MainApi;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WaitlistController extends Controller
{
    public function __construct(private readonly MainApi $api) {}

    public function show(): View
    {
        return view('waitlist', [
            'title' => 'Join the waitlist | Claryeo',
            'meta_description' => 'Be the first to know when Claryeo launches.',
        ]);
    }

    /**
     * Proxy the signup to the main app's internal API and relay its response.
     */
    public function store(Request $request): JsonResponse
    {
        // Mirrors the main app's waitlist validation so a bad submission is
        // rejected here rather than round-tripping for a 422.
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:32'],
        ]);

        $payload = [
            ...$request->only(['email', 'name', 'phone', 'source']),
            ...CaptureUtmParameters::resolve($request),
            'client_ip' => $request->ip(),
            'client_user_agent' => $request->userAgent(),
        ];

        $response = $this->api->submitWaitlist($payload);

        return response()->json($response->json() ?? [], $response->status());
    }
}
