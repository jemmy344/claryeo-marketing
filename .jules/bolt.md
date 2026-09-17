## 2026-09-17 - Bounding Statamic Stache Entry Queries in View Composers
**Learning:** Calling `Entry::query()->where('collection', 'blog')->get()` without a query limit hydrates every single entry file in the collection from the Stache store into memory as `Statamic\Entries\Entry` instances.
**Action:** When building fallback or top-N lists in View Composers or controllers, calculate the maximum needed entries and apply `$query->limit($limit)` on the Stache `EntryQueryBuilder` to avoid full-collection disk reads and object hydration.

## 2026-08-22 - O(1) Slug Indexing for Static Dataset Lookup
**Learning:** `SalaryPages::find($slug)` and `SalaryPages::slugs()` executed linear $O(N)$ scans over array items loaded from JSON on every call. Indexing by `slug` in a static `$bySlug` hash map during dataset load converts lookups to $O(1)$ constant time while preserving strict typing for PHPStan level 9.
**Action:** When working with static JSON-backed datasets or lookup helpers, build slug/ID indexed associative maps during initial load rather than searching linearly on demand.
