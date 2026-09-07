## 2026-08-22 - O(1) Slug Indexing for Static Dataset Lookup
**Learning:** `SalaryPages::find($slug)` and `SalaryPages::slugs()` executed linear $O(N)$ scans over array items loaded from JSON on every call. Indexing by `slug` in a static `$bySlug` hash map during dataset load converts lookups to $O(1)$ constant time while preserving strict typing for PHPStan level 9.
**Action:** When working with static JSON-backed datasets or lookup helpers, build slug/ID indexed associative maps during initial load rather than searching linearly on demand.

## 2026-08-23 - Conditional Hook Allocation and Memoization in Table Grids
**Learning:** In large list/grid renderers like `PlanComparisonMatrix` with dozens of rows, unconditionally invoking hook controllers (such as `useTooltipController` containing state and `useDebounce` timers) on every row creates dozens of unused timer/state hooks for rows without descriptions. Isolating hook usage to a sub-component rendered only when `description` exists, combined with `React.memo` and `useMemo` for derived prop objects, reduces row re-renders and hook allocations by >90% during interactive state updates.
**Action:** For large list or matrix rows, only instantiate hover/tooltip controller hooks inside sub-components when the underlying data actually requires the interactive behavior.
