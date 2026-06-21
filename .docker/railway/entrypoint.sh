#!/bin/sh
set -e

log() { echo "[railway-entrypoint] $*"; }

# ─── Generate Nginx config from template ────────────────────────────────────
# envsubst replaces ${PORT} and ${APP_DOMAIN}; Nginx's own $uri/$query_string
# are preserved by limiting the variables envsubst will touch.

log "Generating Nginx config (PORT=${PORT:-8080}) ..."
mkdir -p /etc/nginx/conf.d
envsubst '${PORT} ${APP_DOMAIN}' \
    < /etc/nginx/templates/site.conf.template \
    > /etc/nginx/conf.d/site.conf

# ─── Persist writable dirs on the Railway volume ─────────────────────────────
# Railway injects RAILWAY_VOLUME_MOUNT_PATH when a volume is attached. Seed each
# writable dir into the volume on first boot, then replace the image's copy with
# a symlink so CP-created users/uploads and runtime storage survive deploys.
# (content/ is excluded — see below.) Without a volume (e.g. local `docker run`)
# this is skipped and the dirs stay in the image.
APP_ROOT=/var/www/html
VOL="${RAILWAY_VOLUME_MOUNT_PATH:-}"

persist_dir() {
    rel="$1"
    app="$APP_ROOT/$rel"
    dst="$VOL/$(echo "$rel" | tr '/' '_')"   # public/assets -> public_assets
    if [ ! -d "$dst" ]; then
        log "Seeding volume ($dst) from image ($app) ..."
        mkdir -p "$dst"
        [ -d "$app" ] && cp -a "$app/." "$dst/" 2>/dev/null || true
    fi
    if [ ! -L "$app" ]; then
        rm -rf "$app"
        mkdir -p "$(dirname "$app")"
        ln -s "$dst" "$app"
    fi
}

if [ -n "$VOL" ]; then
    log "Persistent volume at $VOL — linking users/storage ..."
    persist_dir users
    persist_dir storage
    # content/ and public/assets are intentionally NOT persisted: blog posts and
    # their images are authored in git and baked into the image. persist_dir
    # seeds the volume once, so a persisted dir shadows everything committed after
    # the first deploy (posts and images 404). Serve them from the image instead.
    # (Author via git, not the staging/prod CP.)
else
    log "No RAILWAY_VOLUME_MOUNT_PATH set — running without a persistent volume."
fi

# Ensure Laravel's writable subtree exists (resolves into the volume when linked).
mkdir -p \
    /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/content \
    /var/www/html/users \
    /var/www/html/public/assets
chown -R www-data:www-data /var/www/html/storage /var/www/html/content /var/www/html/users /var/www/html/public/assets 2>/dev/null || true
[ -n "$VOL" ] && chown -R www-data:www-data "$VOL" 2>/dev/null || true

# ─── Database (SQLite) ───────────────────────────────────────────────────────
# Statamic content stays flat-file, but the post_views counter lives in SQLite
# under storage/ (symlinked onto the Railway volume above) so view counts
# survive deploys. Create it on first boot, then migrate.
# ponytail: SQLite is enough for one counter table — swap to Postgres in all
# envs when analytics/newsletters need it.
DB_FILE="${DB_DATABASE:-/var/www/html/database/database.sqlite}"
if [ ! -f "$DB_FILE" ]; then
    log "Creating SQLite database at $DB_FILE ..."
    mkdir -p "$(dirname "$DB_FILE")"
    touch "$DB_FILE"
    chown www-data:www-data "$DB_FILE"
fi
log "Running migrations ..."
php artisan migrate --force

# ─── Production optimisations ────────────────────────────────────────────────
# Rebuild the Stache so the first request isn't slow. Must REFRESH (clear +
# warm), not just warm: the Stache lives under storage/ which is persisted on
# the volume, so a stale index from a previous deploy would otherwise hide posts
# added to the image since (content/ ships from git, not the volume).

if [ "$APP_ENV" = "production" ] || [ "$APP_ENV" = "staging" ]; then
    log "Caching config, routes and views ..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    log "Refreshing the Statamic Stache (clear + warm) ..."
    php artisan statamic:stache:refresh || log "Warning: stache refresh failed (continuing)."
fi

php artisan storage:link --quiet 2>/dev/null || true

# ─── Final ownership pass ────────────────────────────────────────────────────
# The artisan commands above run as root and create files in storage/ and
# bootstrap/cache (config cache, warmed Stache indexes). php-fpm serves as
# www-data and must be able to rewrite them — otherwise the first content page
# hits "Permission denied" on storage/framework/cache/.../stache. Re-chown last.
chown -R www-data:www-data \
    /var/www/html/storage \
    /var/www/html/bootstrap/cache \
    /var/www/html/content \
    /var/www/html/users 2>/dev/null || true
[ -n "$VOL" ] && chown -R www-data:www-data "$VOL" 2>/dev/null || true

log "Starting services ..."
exec "$@"
