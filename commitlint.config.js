/**
 * Conventional Commits ruleset.
 * @see https://www.conventionalcommits.org
 *
 * The repo already follows this style (feat, fix, build(railway), …).
 */
export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // Allow a slightly longer subject line than the 100-char default.
        'header-max-length': [2, 'always', 120],
    },
};
