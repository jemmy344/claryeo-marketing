## 2026-06-21 - Statamic Stache collection query vs manual loop sorting
**Learning:** Using `Entry::whereCollection()` returns an unindexed collection requiring manual PHP loop filtering (`$entry->published()`) and array sorting (`usort()`). Using `Entry::query()->where('collection', 'blog')->where('published', true)->orderBy('date', 'desc')` delegates filtering and sorting to Statamic's Stache QueryBuilder index.
**Action:** Always prefer `Entry::query()` for filtering and sorting Statamic collection entries.
