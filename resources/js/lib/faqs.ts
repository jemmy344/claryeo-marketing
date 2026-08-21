import type { FaqItem } from '@/components/faq';

import faqs from '../../data/faqs.json';

/**
 * Every hand-written FAQ set on the marketing site. The data lives in
 * resources/data/faqs.json so PHP can render the same content server-side
 * (fallback markup + FAQPage JSON-LD, see app/Support/Faqs.php). Feature page
 * FAQs are the exception: they come from config/feature_pages.php as page props.
 */

export const landingFaqs: FaqItem[] = faqs.landing;
export const contactFaqs: FaqItem[] = faqs.contact;
export const taxCalculatorFaqs: FaqItem[] = faqs.taxCalculator;

// The guide sets (payeGuide, freelancerGuide, invoiceGuide, smallBusinessGuide)
// are deliberately not re-exported: the guides are Statamic entries now and
// render their set server-side through the {{ faqs :key="faq_key" }} tag.
