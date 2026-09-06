## 2026-08-22 - O(1) Slug Indexing for Static Dataset Lookup
**Learning:** `SalaryPages::find($slug)` and `SalaryPages::slugs()` executed linear $O(N)$ scans over array items loaded from JSON on every call. Indexing by `slug` in a static `$bySlug` hash map during dataset load converts lookups to $O(1)$ constant time while preserving strict typing for PHPStan level 9.
**Action:** When working with static JSON-backed datasets or lookup helpers, build slug/ID indexed associative maps during initial load rather than searching linearly on demand.

## 2026-09-06 - Precomputing Static Dataset Metrics & Hoisting Flip Operations
**Learning:** Re-evaluating `reduce()`, number formatting, and SVG point string building for static constants inside React component render bodies (especially scroll-animated components) causes unnecessary garbage collection and main thread work on every frame. In PHP middleware, re-running `array_flip()` on static array constants on every HTTP request adds unnecessary allocation overhead.
**Action:** Hoist calculations over static data sets out of component render functions to module scope, and cache flipped static arrays in static properties (`self::$flippedKeys ??= array_flip(...)`).
