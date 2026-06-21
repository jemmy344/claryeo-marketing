<p align="center">
<picture>
    <source srcset="https://statamic.com/assets/branding/squircle/statamic-logo-lime-white.svg" media="(prefers-color-scheme: dark)">
    <img align="center" width="350" alt="Statamic Logo" src="https://statamic.com/assets/branding/squircle/statamic-logo-lime.svg">
</picture>
</p>

## Content & deployment model

Deployed on Railway (Docker). Two rules govern where things live:

**Authored in git, served from the image** (the Docker build is the source of truth):

- Blog posts — `content/collections/blog/*.md`
- Blog images — `public/assets/...` (commit **both** the file and its `.meta/*.yaml` sidecar)
- Statamic CP assets — `public/vendor/statamic/cp`. Statamic 6 ships `resources/dist` empty in the Composer package, so these can't be regenerated in the image and must be committed. **Recommit after every Statamic upgrade:** `php artisan vendor:publish --tag=statamic-cp --force`.

**Persisted on the Railway volume** (seeded once, on first boot): only `users/` and `storage/` — runtime/server state, including the `post_views` SQLite DB. The volume must NOT hold anything authored in git: it's seeded once, so it would shadow every later commit and the content/images would 404. `content/` and `public/assets` are deliberately not persisted (see `.docker/railway/entrypoint.sh`).

**Workflow:**

- Author posts and upload assets in the **local** CP, then `git add` + commit (assets: the file **and** its `.meta/*.yaml`), push, deploy.
- Do **not** author content or upload assets via the staging/prod CP — those dirs aren't persisted there, so the changes vanish on the next redeploy.
- `hero_image` is a free-text URL field: use an external CDN URL or a host-relative `/assets/...` path — never an absolute `http://localhost:8088/...` dev URL.
- The Stache is rebuilt (`statamic:stache:refresh`) on every deploy, so committed content appears.

## Code quality & git hooks

This project enforces formatting, static analysis, and commit conventions both
locally (via git hooks) and in CI.

| Check | Tool | Command |
|-------|------|---------|
| PHP formatting | [Laravel Pint](https://laravel.com/docs/pint) | `composer lint` (fix) / `composer lint:test` (check) |
| Static analysis | PHPStan + [Larastan](https://github.com/larastan/larastan), level 9 | `composer stan` |
| Commit messages | [commitlint](https://commitlint.js.org) (Conventional Commits) | runs on commit |

**Hooks** (managed by [Husky](https://typicode.github.io/husky/)):

- `pre-commit` — formats changed PHP files with Pint, then runs PHPStan.
- `commit-msg` — validates the message against Conventional Commits.

Because `.npmrc` sets `ignore-scripts=true`, Husky is **not** installed
automatically by `pnpm install`. After cloning, enable the hooks once with:

```sh
pnpm install
pnpm run prepare
```

CI (`.github/workflows/ci.yml`) runs the same Pint + PHPStan checks and
validates every commit in a pull request.

## About Statamic

Statamic is the flat-first, Laravel + Git powered CMS designed for building beautiful, easy to manage websites.

> [!NOTE]
> This repository contains the code for a fresh Statamic project that is installed via the Statamic CLI tool.
>
> The code for the Statamic Composer package itself can be found at the [Statamic core package repository][cms-repo].


## Learning Statamic

Statamic has extensive [documentation][docs]. We dedicate a significant amount of time and energy every day to improving them, so if something is unclear, feel free to open issues for anything you find confusing or incomplete. We are happy to consider anything you feel will make the docs and CMS better.

## Support

We provide official developer support on [Statamic Pro](https://statamic.com/pricing) projects. Community-driven support is available via [GitHub Discussions](https://github.com/statamic/cms/discussions) and in [Discord][discord].


## Contributing

Thank you for considering contributing to Statamic! We simply ask that you review the [contribution guide][contribution] before you open issues or send pull requests.


## Code of Conduct

In order to ensure that the Statamic community is welcoming to all and generally a rad place to belong, please review and abide by the [Code of Conduct](https://github.com/statamic/cms/wiki/Code-of-Conduct).


## Important Links

- [Statamic Main Site](https://statamic.com)
- [Statamic Documentation][docs]
- [Statamic Core Package Repo][cms-repo]
- [Statamic Migrator](https://github.com/statamic/migrator)
- [Statamic Discord][discord]

[docs]: https://statamic.dev/
[discord]: https://statamic.com/discord
[contribution]: https://github.com/statamic/cms/blob/master/CONTRIBUTING.md
[cms-repo]: https://github.com/statamic/cms
