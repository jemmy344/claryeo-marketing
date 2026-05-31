<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Config;
use Symfony\Component\HttpFoundation\Response;

class FeatureController extends Controller
{
    /**
     * Features overview: a card per feature linking to its dedicated page.
     */
    public function index(): View
    {
        /** @var array<string, array{slug: string, title: mixed, eyebrow: mixed, tagline: mixed, badge?: mixed, icon?: mixed}> $featurePages */
        $featurePages = Config::array('feature_pages', []);

        $features = collect($featurePages)
            ->map(fn (array $f): array => [
                'slug' => $f['slug'],
                'title' => $f['title'],
                'eyebrow' => $f['eyebrow'],
                'tagline' => $f['tagline'],
                'badge' => $f['badge'] ?? null,
                'icon' => $f['icon'] ?? 'Sparkles',
                'href' => '/features/'.$f['slug'],
            ])
            ->values()
            ->all();

        return view('features', [
            'title' => 'Features — Claryeo',
            'meta_description' => 'Invoicing, bank sync, tax & reports, and an AI assistant — everything you need to run your business, in one place.',
            'island_props' => htmlspecialchars(
                (string) json_encode(['features' => $features]),
                ENT_QUOTES,
                'UTF-8'
            ),
        ]);
    }

    /**
     * Render an individual feature page from config/feature_pages.php via the
     * shared feature-page island. The CTA honours waitlist mode.
     */
    public function show(string $slug): View
    {
        $feature = config("feature_pages.{$slug}");

        abort_if(! is_array($feature), Response::HTTP_NOT_FOUND);
        /** @var array{title: string, heroParagraph: string, slug: string} $feature */
        $waitlistMode = (bool) config('marketing.waitlist_mode');
        $cta = $waitlistMode
            ? ['label' => 'Join the waitlist', 'href' => '/waitlist']
            : ['label' => 'Get started', 'href' => '/get-started'];

        return view('feature', [
            'title' => $feature['title'].' — Claryeo',
            'meta_description' => $feature['heroParagraph'],
            'island_props' => htmlspecialchars(
                (string) json_encode([
                    'feature' => $feature,
                    'waitlistMode' => $waitlistMode,
                    'cta' => $cta,
                ]),
                ENT_QUOTES,
                'UTF-8'
            ),
        ]);
    }
}
