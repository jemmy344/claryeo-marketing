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

# ─── Writable flat-file storage (Statamic content/users + Laravel storage) ───
# On Railway these live on a mounted volume; make sure perms are correct.
mkdir -p \
    /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/content \
    /var/www/html/users
chown -R www-data:www-data /var/www/html/storage /var/www/html/content /var/www/html/users 2>/dev/null || true

# ─── Production optimisations ────────────────────────────────────────────────
# No database / migrations: Statamic content is flat-file. Warm the Stache so
# the first request isn't slow.

if [ "$APP_ENV" = "production" ] || [ "$APP_ENV" = "staging" ]; then
    log "Caching config, routes and views ..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    log "Warming the Statamic Stache ..."
    php artisan statamic:stache:warm || log "Warning: stache warm failed (continuing)."
fi

php artisan storage:link --quiet 2>/dev/null || true

log "Starting services ..."
exec "$@"
