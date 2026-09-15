## 2026-08-22 - O(1) Slug Indexing for Static Dataset Lookup
**Learning:** `SalaryPages::find($slug)` and `SalaryPages::slugs()` executed linear $O(N)$ scans over array items loaded from JSON on every call. Indexing by `slug` in a static `$bySlug` hash map during dataset load converts lookups to $O(1)$ constant time while preserving strict typing for PHPStan level 9.
**Action:** When working with static JSON-backed datasets or lookup helpers, build slug/ID indexed associative maps during initial load rather than searching linearly on demand.

## 2026-09-02 - Module-Level Intl.NumberFormat Instance Caching
**Learning:** Calling `Number.prototype.toLocaleString()` inside hot utility functions like `formatCurrency()` repeatedly parses locale options and instantiates internal `Intl.NumberFormat` objects on every call, creating unnecessary CPU work and garbage collection churn during interactive UI re-renders.
**Action:** Pre-instantiate static `Intl.NumberFormat` instances at module scope for common locales (`en-NG`, `en-US`) and reuse them via `.format(amount)`.
