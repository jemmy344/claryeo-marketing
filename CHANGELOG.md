# Changelog

All notable changes to the Claryeo marketing site. Format based on
[Keep a Changelog](https://keepachangelog.com/). Dates are `YYYY-MM-DD`.

## 2026-08-17 — Landing rebuild, contact & waitlist redesign

### Added
- **Rebuilt landing page** — new hero, product bento, ledger rail, reconciliation
  ring/spotlight, reports spotlight, business-balance spotlight, final CTA and an
  atmosphere canvas, plus dashboard preview components and a shared `ui/chart`.
- **Redesigned contact page** — full-bleed tinted band, typographic support
  columns, `mailto:`/`tel:` links, in-field icons, a live 1000-character message
  counter, bold Terms/Privacy links, and an FAQ section whose email box carries
  the address into the form above.
- **Phone capture** on the waitlist and contact forms; `phone` is proxied to the
  main API by both controllers.
- **Section bullets on feature pages** — the 45 `bullets` strings in
  `config/feature_pages.php` render again, under each section's body.

### Changed
- **Islands are code-split.** The registry now uses dynamic imports, so a page
  downloads only the islands it mounts: the single 1,541 kB eager chunk became a
  ~192 kB shared entry plus per-island chunks (+59 kB on /contact, +43 kB for the
  nav, 806 kB only on the landing page).
- **Waitlist copy** — "3 months free" removed site-wide (waitlist, four guides,
  `guide-layout`, tax calculator, one blog post); new headline, subhead and
  "Save my spot" CTA; the wordmark uses the logo's sans face.
- **Landing nav** — drawer panels and the mobile sheet share the header's `ink`
  surface, the header goes opaque while a menu is open, and links moved from
  `text-mist` to `text-paper/80` for legibility over the hero.
- Contact and waitlist submissions are validated before proxying, so the form's
  limits can't drift from the main app's.

### Fixed
- PHPStan level-9 failures in `FeatureController` that would have broken the
  pre-commit hook and CI.
- Testimonials rendered on the homepage in waitlist mode.
- `useRevealOnce` ran *more* animation under `prefers-reduced-motion`, and section
  reveals flickered because the hidden start state was applied on scroll.
- Invoicing bento card linked to `/tax-calculator`.
- Blog index repeated the three "Most read" posts; heading levels in the blog
  partials.
- Privacy toggle leaked the hidden balance through a native `title` tooltip.
- Contact FAQ email box shared state with the form's email input.
- Waitlist fields had no accessible name.
- Malformed `feature_pages` entries 500'd every route from `AppServiceProvider::boot()`;
  a bad entry now drops one card/menu row.

### Removed
- `ui/text.tsx`, the unused `ui/chart` exports (~213 lines), the unreachable
  `ChecklistCard`, and the `--atm-negative-tint` token.

## 2026-06-21 — Blog views & deploy reliability

### Added
- **Blog post-view tracking** — `post_views` table + `PostViews` service record a
  session-deduped view per post via a client-side beacon (`POST /blog/{id}/view`),
  gated by `marketing.view_tracking`.
- **"Top Reads"** block on the blog index — most-viewed published posts via a view
  composer, with a cold-start fallback to recent posts.
- **Redesigned post page** — table of contents, related posts, and the view beacon.
- **Blog partials** — featured post, Top Reads list, and pagination.
- **SQLite database** — created and migrated on boot (under `storage/`, on the
  Railway volume) so view counts survive deploys.
- **Content & deployment model docs** — in `README.md`, `AGENTS.md`, `CLAUDE.md`.

### Changed
- Upgraded `statamic/cms` 6.20.2 → 6.22.0 (pulled `laravel/framework` 13.12 → 13.16).
- Content (`content/`) and assets (`public/assets`) now ship from the Docker image
  instead of the Railway volume, so anything authored in git appears on deploy.
- The Stache is rebuilt (`statamic:stache:refresh`) and the app cache cleared
  (`cache:clear`) on every deploy, so committed posts and assets aren't hidden by a
  stale index/listing.

### Fixed
- Blog index 500 when the `post_views` table didn't exist (`QueryException`); Top
  Reads now fails soft to the recent-posts fallback.
- Only 3 of 6 posts and their hero images showing on staging (seed-once volume
  shadowing git-authored content/assets).
- Hero images broken from absolute `http://localhost:8088/...` URLs baked in at
  authoring time; now host-relative `/assets/...`.
- CP 500 (`ViteManifestNotFoundException`) after the Statamic upgrade — CP assets
  must be committed (the package ships `resources/dist` empty) and recommitted per
  upgrade.
- CP asset browser not listing git-added images despite them existing on disk.

## 2026-06-07

### Added
- Railway persistent-volume support for writable directories.

## 2026-05-31 — Initial marketing site

### Added
- **Site shell** — shared head/nav/footer, sticky themed header with Features and
  Resources mega-menus, richer footer, light/dark theme, global CSS.
- **Pages** — landing (home), features (index + per-feature pages), about, contact,
  get-started, and legal pages.
- **Pricing** — page backed by the internal API, with the real pricing components
  ported and a sticky comparison header.
- **Tax calculator** — calculator page and React island with a report proxy.
- **Guides** — the four guide pages ported as islands.
- **Blog** — Statamic blog collection with native index, category, and post views,
  plus category filter chips.
- **Leads** — contact + waitlist forms with UTM capture.
- **Waitlist mode** — site-wide `WAITLIST_MODE` toggling CTAs and hiding pricing.
- **Cross-domain handoff** — plan selection passed from marketing to the app.
- **Internal API client** (`MainApi`) for legal/pricing content over Railway's
  private network.
- **SEO** — dynamic `sitemap.xml` and host-aware `robots.txt`; favicons.
- **Routing** — marketing routes + UTM-capture middleware.
- **Deployment** — Railway image (Nginx + PHP-FPM via supervisord), Statamic CP
  assets published/committed for the Control Panel, proxy/HTTPS handling.
