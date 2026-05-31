<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Symfony\Component\HttpFoundation\Response;

class GuideController extends Controller
{
    /**
     * Render a guide page. The body lives in the matching "guide-{slug}" island;
     * the shell head (title/description/canonical) comes from config/guides.php.
     */
    public function show(string $slug): View
    {
        $guide = config("guides.{$slug}");

        abort_if(! is_array($guide), Response::HTTP_NOT_FOUND);

        return view('guide', [
            'title' => $guide['title'],
            'meta_description' => $guide['description'],
            'canonical_url' => 'https://claryeo.com/guides/'.$slug,
            'guide_island' => 'guide-'.$slug,
        ]);
    }
}
