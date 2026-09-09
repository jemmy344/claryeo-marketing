## 2026-08-22 - O(1) Slug Indexing for Static Dataset Lookup
**Learning:** `SalaryPages::find($slug)` and `SalaryPages::slugs()` executed linear $O(N)$ scans over array items loaded from JSON on every call. Indexing by `slug` in a static `$bySlug` hash map during dataset load converts lookups to $O(1)$ constant time while preserving strict typing for PHPStan level 9.
**Action:** When working with static JSON-backed datasets or lookup helpers, build slug/ID indexed associative maps during initial load rather than searching linearly on demand.

## 2026-09-09 - Single Pass Progressive Tax Band Allocation Re-use
**Learning:** In interactive tax calculation engines that compute taxes on every keystroke, calling `calculateProgressiveBandAllocations()` both to render tax band rows and to calculate total progressive tax executes duplicate band array allocations and loop passes. Re-using the band allocation array to derive total tax halves progressive band loop passes and object allocations per calculation pass.
**Action:** When calculating progressive/tiered structures that generate detailed breakdown rows as well as totals, derive totals from the generated breakdown allocations rather than calling allocation logic twice.
