<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **claryeo-marketing** (1429 symbols, 2595 relationships, 99 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/claryeo-marketing/context` | Codebase overview, check index freshness |
| `gitnexus://repo/claryeo-marketing/clusters` | All functional areas |
| `gitnexus://repo/claryeo-marketing/processes` | All execution flows |
| `gitnexus://repo/claryeo-marketing/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

# Content & deployment model

Deployed on Railway (Docker). Two rules govern where things live:

**Authored in git, served from the image** (the Docker build is the source of truth):
- Blog posts — `content/collections/blog/*.md`
- Blog images — `public/assets/...` (commit **both** the file and its `.meta/*.yaml` sidecar)
- Statamic CP assets — `public/vendor/statamic/cp`. Statamic 6 ships `resources/dist` empty in the Composer package, so these can't be regenerated in the image and must be committed. **Recommit after every Statamic upgrade:** `php artisan vendor:publish --tag=statamic-cp --force`.

**Persisted on the Railway volume (seeded once, on first boot):** only `users/` and `storage/` — runtime/server state, including the `post_views` SQLite DB. The volume must NOT hold anything authored in git: it's seeded once, so it would shadow every later commit and the content/images would 404. `content/` and `public/assets` are deliberately not persisted (see `.docker/railway/entrypoint.sh`).

**Workflow — never deviate:**
- Author posts and upload assets in the **local** CP, then `git add` + commit (assets: file **and** `.meta/*.yaml`), push, deploy.
- Do **NOT** author content or upload assets via the staging/prod CP — those dirs aren't persisted there, so the changes vanish on the next redeploy.
- `hero_image` is a free-text URL field: use an external CDN URL or a host-relative `/assets/...` path — **never** an absolute `http://localhost:8088/...` dev URL (it gets baked into the content and breaks on every other host).
- The Stache is rebuilt (`statamic:stache:refresh`) on every deploy, so committed content appears.
