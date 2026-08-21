<?php

namespace App\Tags;

use App\Support\Faqs as FaqBank;
use Statamic\Tags\Tags;

/**
 * {{ faqs :key="faq_key" }} ... {{ /faqs }}
 *
 * Exposes the shared FAQ bank (resources/data/faqs.json) to Antlers templates
 * that are rendered by Statamic itself, where no controller can inject it.
 */
class Faqs extends Tags
{
    /**
     * @return list<array{question: string, answer: string}>
     */
    public function index(): array
    {
        return FaqBank::get((string) $this->params->get('key'));
    }
}
