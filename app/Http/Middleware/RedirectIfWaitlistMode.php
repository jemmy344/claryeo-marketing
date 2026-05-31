<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * When WAITLIST_MODE is on, pricing/get-started are hidden — visiting them
 * redirects to the waitlist (mirrors the main app's behaviour).
 */
class RedirectIfWaitlistMode
{
    public function handle(Request $request, Closure $next): Response
    {
        if (config('marketing.waitlist_mode')) {
            return redirect('/waitlist');
        }

        return $next($request);
    }
}
