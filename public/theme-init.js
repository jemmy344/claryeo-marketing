/**
 * Flash-of-unstyled-content guard: apply the saved light/dark/system theme to
 * <html> before first paint. Loaded synchronously in the shell <head> so it
 * runs before the page renders. The React appearance toggle (use-appearance)
 * takes over reactivity once the bundle loads.
 */
(function () {
    try {
        var pref = localStorage.getItem('appearance') || 'system';
        var dark =
            pref === 'dark' ||
            (pref === 'system' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', dark);
        document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    } catch (e) {}
})();
