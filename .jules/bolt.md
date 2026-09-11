## 2026-08-22 - O(1) Slug Indexing for Static Dataset Lookup
**Learning:** `SalaryPages::find($slug)` and `SalaryPages::slugs()` executed linear $O(N)$ scans over array items loaded from JSON on every call. Indexing by `slug` in a static `$bySlug` hash map during dataset load converts lookups to $O(1)$ constant time while preserving strict typing for PHPStan level 9.
**Action:** When working with static JSON-backed datasets or lookup helpers, build slug/ID indexed associative maps during initial load rather than searching linearly on demand.

## 2026-09-11 - Composite Database Index for Ranked Post View Lookups
**Learning:** `PostViews::topIds()` queries the `post_views` table with `orderByDesc('views')->orderByDesc('last_viewed_at')`. Without a composite index on `(views, last_viewed_at)`, database engines require a full table scan and filesort to rank top posts. Adding a composite index enables index-only scanning for top-viewed post lookups.
**Action:** When performing multi-column ordering (e.g., `views DESC, last_viewed_at DESC`) in database queries, add composite indexes matching the exact column order to avoid filesort operations.
