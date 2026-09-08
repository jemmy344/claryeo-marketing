## 2025-05-18 - Prevent config dot-notation array key traversal
**Vulnerability:** Interpolating route parameters directly into Laravel's `config("prefix.{$input}")` helper allows dot-notation array key traversal into arbitrary nested configuration keys.
**Learning:** Laravel's `config()` helper treats dot characters (`.`) in key strings as path separators for nested arrays.
**Prevention:** Always retrieve top-level config arrays via `Config::array(...)` or `config(...)` and validate `$key` using `array_key_exists($key, $array)` prior to key lookup.
