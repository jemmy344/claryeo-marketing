import { useEffect, useRef } from 'react';
import type { FC } from 'react';

import { useAppearance } from '@/hooks/use-appearance';
import { gsap, prefersReducedMotion, setupMotion } from '@/lib/motion';

type Blob = {
    x: number;
    y: number;
    r: number;
    color: string;
};

type Variant = 'dawn' | 'dusk';

const PALETTES: Record<'dark' | 'light', Record<Variant, { blobs: string[]; base: string }>> = {
    dark: {
        dawn: { blobs: ['#2596ff', '#9163f2', '#6ee7ff', '#0b0a13'], base: '#050914' },
        dusk: { blobs: ['#ff8a5b', '#9163f2', '#ffd08a', '#0b0a13'], base: '#0b0a13' },
    },
    light: {
        dawn: { blobs: ['#a9d6ff', '#c9b6f5', '#d8f3ff', '#efe6ff'], base: '#f6f4ef' },
        dusk: { blobs: ['#ffb98f', '#c9b6f5', '#ffe3b3', '#ffd7c2'], base: '#f6efe6' },
    },
};

type AtmosphereCanvasProps = {
    variant: Variant;
    className?: string;
};

/**
 * A generative, animated gradient-mesh "sky" -- stands in for full-bleed
 * photography without depending on stock assets. Blobs drift slowly via
 * GSAP; reduced-motion users get a static first frame.
 */
const AtmosphereCanvas: FC<AtmosphereCanvasProps> = ({
    variant,
    className = '',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [{ resolvedAppearance }] = useAppearance();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        setupMotion();

        const { blobs: palette, base } = PALETTES[resolvedAppearance][variant];
        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        const blobs: Blob[] = palette.map((color, i) => ({
            x: 0.2 + (i / palette.length) * 0.7,
            y: 0.15 + (i % 2) * 0.5,
            r: 0.55 + i * 0.08,
            color,
        }));

        const resize = (): void => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = (): void => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = base;
            ctx.fillRect(0, 0, width, height);

            for (const blob of blobs) {
                const cx = blob.x * width;
                const cy = blob.y * height;
                const r = blob.r * Math.max(width, height);
                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                grad.addColorStop(0, blob.color + 'cc');
                grad.addColorStop(1, blob.color + '00');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);
            }
        };

        resize();
        draw();

        const ro = new ResizeObserver(() => {
            resize();
            draw();
        });
        ro.observe(canvas);

        if (prefersReducedMotion()) {
            return () => ro.disconnect();
        }

        const proxies = blobs.map((blob) => ({ ...blob }));
        const tweens = proxies.map((proxy, i) =>
            gsap.to(proxy, {
                x: proxy.x + (i % 2 === 0 ? 0.18 : -0.16),
                y: proxy.y + (i % 2 === 0 ? -0.12 : 0.15),
                duration: 14 + i * 3,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                onUpdate: () => {
                    blobs[i].x = proxy.x;
                    blobs[i].y = proxy.y;
                },
            }),
        );

        // Only paint while the canvas is actually on screen. Two of these
        // mount on the landing page (hero and final CTA); left ungated they
        // both repaint every frame for the whole visit, including while far
        // outside the viewport.
        let ticking = false;
        const setTicking = (on: boolean): void => {
            if (on === ticking) return;
            ticking = on;
            if (on) {
                gsap.ticker.add(draw);
            } else {
                gsap.ticker.remove(draw);
            }
        };

        const io = new IntersectionObserver(([entry]) =>
            setTicking(entry.isIntersecting),
        );
        io.observe(canvas);

        return () => {
            ro.disconnect();
            io.disconnect();
            tweens.forEach((t) => t.kill());
            setTicking(false);
        };
    }, [variant, resolvedAppearance]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
        />
    );
};

export default AtmosphereCanvas;
