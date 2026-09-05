## 2025-03-05 - Config Dot-Notation Traversal
**Vulnerability:** Interpolating route parameter `{slug}` directly into `config("feature_pages.{$slug}")` allowed dot-notation array navigation (e.g. `/features/invoicing.media`), which retrieved sub-arrays and caused PHP undefined array key errors rather than returning 404 Not Found.
**Learning:** Laravel's `config()` helper evaluates dots as nested key accesses via `Arr::get()`, treating input containing `.` as subkey selectors.
**Prevention:** Fetch the top-level configuration array and check key existence using `array_key_exists($slug, $configArray)` instead of passing user input into `config()`.
