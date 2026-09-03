## 2026-08-22 - O(1) Slug Indexing for Static Dataset Lookup
**Learning:** `SalaryPages::find($slug)` and `SalaryPages::slugs()` executed linear $O(N)$ scans over array items loaded from JSON on every call. Indexing by `slug` in a static `$bySlug` hash map during dataset load converts lookups to $O(1)$ constant time while preserving strict typing for PHPStan level 9.
**Action:** When working with static JSON-backed datasets or lookup helpers, build slug/ID indexed associative maps during initial load rather than searching linearly on demand.

## 2026-08-23 - Bounded Hydration for Statamic Entry Queries
**Learning:** Querying `Entry::query()` without a `.limit()` forces Statamic's Stache store to retrieve and hydrate all collection entries into memory, even when only a small subset of fallback items is actually needed by the view composer. Applying `->limit($limit)` bounds object hydration at the store layer.
**Action:** Always supply `.limit()` on Statamic `Entry::query()` builder calls when only a fixed or bounded number of entries is required.
