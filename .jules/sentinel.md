## 2026-03-30 - Prevent Dot-Notation Config Array Traversal from Route Slugs
**Vulnerability:** Passing untrusted user parameters directly into `config("prefix.{$input}")` allows dot-notation array key traversal (`Arr::get`), enabling sub-key access (e.g. `/features/invoicing.highlights`).
**Learning:** In Laravel, `config('key.path')` interprets dots as array path separators, which can leak nested config objects or cause type errors when non-associative sub-arrays are processed expecting specific array keys.
**Prevention:** Always load the top-level configuration array via `(array) config('prefix', [])` or `Config::array('prefix', [])` and validate key existence with `array_key_exists($key, $config)` before accessing.
