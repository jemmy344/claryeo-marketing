import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Register GSAP plugins once and disable motion site-wide for reduced-motion users. */
export function setupMotion(): typeof gsap {
    if (!registered) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.config({ nullTargetWarn: false });
        registered = true;

        // Web fonts (Fraunces etc.) and late layout shifts land after
        // ScrollTriggers are first created, leaving their measured
        // start/end positions stale -- a known GSAP gotcha. `load` and
        // `fonts.ready` catch most of it; the timeout is a safety net for
        // whatever settles after those (seen in practice on cold loads).
        if (typeof document !== 'undefined' && 'fonts' in document) {
            document.fonts.ready.then(() => ScrollTrigger.refresh());
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('load', () => ScrollTrigger.refresh());
            setTimeout(() => ScrollTrigger.refresh(), 500);
        }
    }

    return gsap;
}

/**
 * Reports 0..1 as `el` passes through the viewport -- 0 when its top touches
 * the bottom edge, 1 when its bottom clears the top edge. rAF-throttled,
 * fires once immediately, returns its own teardown.
 *
 * ponytail: a plain listener rather than a ScrollTrigger/ScrollObserver --
 * it re-measures every frame, so nothing goes stale when fonts or images
 * settle late.
 */
export function onScrollProgress(el: HTMLElement, onProgress: (p: number) => void): () => void {
    let frame = 0;

    const apply = () => {
        frame = 0;
        const { top, height } = el.getBoundingClientRect();
        const p = (window.innerHeight - top) / (window.innerHeight + height);
        onProgress(Math.min(Math.max(p, 0), 1));
    };

    const schedule = () => {
        if (frame) return;
        frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        // A frame queued just before teardown would otherwise still fire,
        // measuring (and writing to) a detached element.
        if (frame) cancelAnimationFrame(frame);
    };
}

export function prefersReducedMotion(): boolean {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
}

export { gsap, ScrollTrigger };
