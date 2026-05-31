<p align="center">
<picture>
    <source srcset="https://statamic.com/assets/branding/squircle/statamic-logo-lime-white.svg" media="(prefers-color-scheme: dark)">
    <img align="center" width="350" alt="Statamic Logo" src="https://statamic.com/assets/branding/squircle/statamic-logo-lime.svg">
</picture>
</p>

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
