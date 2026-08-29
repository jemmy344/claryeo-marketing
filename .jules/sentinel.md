## 2026-08-29 - Configuration Key Traversal via Laravel `config()` Helper
**Vulnerability:** Passing unvalidated user input into Laravel's `config("config_file.{$input}")` allows dot-notation configuration key traversal (e.g., `/features/invoicing.highlights`), returning nested config arrays and bypassing top-level key validation.
**Learning:** Laravel's `config()` helper parses dot (`.`) as a nested array path separator, so string interpolation of user input allows accessing nested array keys that pass `is_array()` checks.
**Prevention:** Always retrieve the top-level configuration array using `Config::array('config_name', [])` or `config('config_name')` first, and access `$configArray[$input] ?? null` using direct array key lookup rather than dot-interpolated string keys.
