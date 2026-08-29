## 2026-08-29 - O(1) Hash Map Indexing for Precomputed JSON Support Classes
**Learning:** Static support classes reading large precomputed JSON datasets (like `SalaryPages` with 700+ entries) can become an O(N) bottleneck when using linear `foreach` searches on every request or route evaluation.
**Action:** Index large precomputed datasets into an associative hash map (`$bySlug`) and precalculate slug arrays when data is first loaded into memory for O(1) constant time lookups.
