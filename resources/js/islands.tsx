import { StrictMode, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import AppearanceToggle from './islands/appearance-toggle';
import ContactForm from './islands/ContactForm';
import Pricing from './islands/pricing/page';
import TaxCalculator from './islands/tax-calculator/page';
import Waitlist from './islands/waitlist/page';
import { initializeTheme } from '@/hooks/use-appearance';

/**
 * Registry of engineer-owned interactive React "islands" mounted into
 * Statamic-rendered pages. A page includes:
 *
 *   <div data-island="pricing" data-props="{{ props_json }}"></div>
 *
 * and this script hydrates it with the matching component + JSON props.
 */
const registry: Record<string, ComponentType<Record<string, unknown>>> = {
    pricing: Pricing as ComponentType<Record<string, unknown>>,
    'contact-form': ContactForm as ComponentType<Record<string, unknown>>,
    'waitlist-form': Waitlist as ComponentType<Record<string, unknown>>,
    'tax-calculator': TaxCalculator as ComponentType<Record<string, unknown>>,
    'appearance-toggle': AppearanceToggle as ComponentType<
        Record<string, unknown>
    >,
};

function mountIslands(): void {
    document.querySelectorAll<HTMLElement>('[data-island]').forEach((el) => {
        const name = el.dataset.island;

        if (!name || el.dataset.mounted === 'true') {
            return;
        }

        const Component = registry[name];

        if (!Component) {
            console.warn(`[islands] no component registered for "${name}"`);
            return;
        }

        let props: Record<string, unknown> = {};

        if (el.dataset.props) {
            try {
                props = JSON.parse(el.dataset.props) as Record<string, unknown>;
            } catch (error) {
                console.error(`[islands] invalid props JSON for "${name}"`, error);
            }
        }

        el.dataset.mounted = 'true';
        createRoot(el).render(
            <StrictMode>
                <Component {...props} />
            </StrictMode>,
        );
    });
}

// Sync the stored light/dark/system preference (and listen for OS changes).
// A blocking inline script in the shell <head> already applied the initial
// class to avoid a flash; this wires up reactivity for the toggle.
initializeTheme();

if (document.readyState !== 'loading') {
    mountIslands();
} else {
    document.addEventListener('DOMContentLoaded', mountIslands);
}
