## 2026-08-22 - O(1) Slug Indexing for Static Dataset Lookup
**Learning:** `SalaryPages::find($slug)` and `SalaryPages::slugs()` executed linear $O(N)$ scans over array items loaded from JSON on every call. Indexing by `slug` in a static `$bySlug` hash map during dataset load converts lookups to $O(1)$ constant time while preserving strict typing for PHPStan level 9.
**Action:** When working with static JSON-backed datasets or lookup helpers, build slug/ID indexed associative maps during initial load rather than searching linearly on demand.

## 2026-08-22 - Memoization of Shared Presentation Accordions Across Interactive Islands
**Learning:** Shared presentation components such as `FaqSection` and `FaqAccordion` rendered at the bottom of interactive pages (e.g. `TaxCalculatorPage`) re-render on every state update or keystroke unless wrapped with `React.memo()`.
**Action:** Wrap purely prop-driven, heavy static presentation trees in `React.memo()` when consumed within highly interactive parent components.
