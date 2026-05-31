#!/usr/bin/env bash
# =============================================================================
# Claryeo Marketing — Railway variable configuration (this service only)
#
# Sets the environment variables for the standalone `marketing` service in the
# shared `claryeo` Railway project, for both production and staging. It touches
# ONLY the marketing service — the main app's web/console/workers/databases are
# left completely alone.
#
# The marketing app is API-ONLY: no database (flat-file content), file
# cache/session, and it reaches the main app's internal API over Railway
# private networking. So there are no Postgres/Redis references here.
#
# Prerequisites:
#   1. railway login
#   2. Link this directory to the claryeo project: `railway link`
#      (select the claryeo project; the `marketing` service must already exist —
#      it's created by the main app's scripts/railway-setup.sh Phase 1).
#
# Usage:
#   ./scripts/railway-marketing-vars.sh                # both environments
#   ./scripts/railway-marketing-vars.sh production      # one environment
#   ./scripts/railway-marketing-vars.sh staging
# =============================================================================

set -euo pipefail

# ─── Configuration (override via env if your domains/slugs differ) ───────────

RAILWAY_MARKETING_SERVICE="${RAILWAY_MARKETING_SERVICE:-marketing}"
# The main app's service name on Railway's private network (for MAIN_API_URL).
RAILWAY_WEB_SERVICE="${RAILWAY_WEB_SERVICE:-web}"

PROD_MARKETING_DOMAIN="${PROD_MARKETING_DOMAIN:-claryeo.com}"
PROD_APP_DOMAIN="${PROD_APP_DOMAIN:-app.claryeo.com}"

STAGING_MARKETING_DOMAIN="${STAGING_MARKETING_DOMAIN:-staging.claryeo.com}"
STAGING_APP_DOMAIN="${STAGING_APP_DOMAIN:-app-staging.claryeo.com}"

# Shared cookie scope so marketing + app sessions/UTMs span subdomains.
SESSION_BASE_DOMAIN="${SESSION_BASE_DOMAIN:-.claryeo.com}"

# ─── Helpers ─────────────────────────────────────────────────────────────────

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { echo -e "${BLUE}[marketing]${NC} $*"; }
ok()   { echo -e "${GREEN}[   ok   ]${NC} $*"; }
warn() { echo -e "${YELLOW}[  warn  ]${NC} $*"; }
err()  { echo -e "${RED}[ error  ]${NC} $*" >&2; }

command -v railway >/dev/null 2>&1 || { err "Railway CLI not found (npm i -g @railway/cli)"; exit 1; }
railway whoami >/dev/null 2>&1 || { err "Not authenticated. Run: railway login"; exit 1; }
railway status >/dev/null 2>&1 || { err "This directory isn't linked to a Railway project. Run: railway link"; exit 1; }

# ─── Configure one environment ───────────────────────────────────────────────

configure() {
    local env_name="$1" app_env="$2" app_debug="$3" marketing_domain="$4" app_domain="$5"

    # Single-quote MAIN_API_URL so the literal ${{web.PORT}} reference reaches
    # Railway instead of being expanded by bash.
    local main_api_ref
    main_api_ref=$(printf 'MAIN_API_URL=http://%s.railway.internal:${{%s.PORT}}' \
        "$RAILWAY_WEB_SERVICE" "$RAILWAY_WEB_SERVICE")

    log "Setting ${RAILWAY_MARKETING_SERVICE} vars for ${env_name}..."
    railway variable set -s "$RAILWAY_MARKETING_SERVICE" -e "$env_name" --skip-deploys \
        "APP_NAME=Claryeo" \
        "APP_ENV=$app_env" \
        "APP_DEBUG=$app_debug" \
        "APP_URL=https://$marketing_domain" \
        "ASSET_URL=https://$marketing_domain" \
        "APP_DOMAIN=$marketing_domain" \
        "MARKETING_URL=https://$marketing_domain" \
        "LOG_CHANNEL=stack" \
        "LOG_STACK=stderr" \
        "CACHE_STORE=file" \
        "SESSION_DRIVER=file" \
        "SESSION_DOMAIN=$SESSION_BASE_DOMAIN" \
        "SESSION_SECURE_COOKIE=true" \
        "QUEUE_CONNECTION=sync" \
        "TRUSTED_PROXIES=*" \
        "FILESYSTEM_DISK=local" \
        "$main_api_ref" \
        "CLARYEO_APP_URL=https://$app_domain" \
        "WAITLIST_MODE=false"
    ok "${env_name} configured"
}

# ─── Run ─────────────────────────────────────────────────────────────────────

target="${1:-all}"

case "$target" in
    production) configure "production" "production" "false" "$PROD_MARKETING_DOMAIN" "$PROD_APP_DOMAIN" ;;
    staging)    configure "staging" "staging" "true" "$STAGING_MARKETING_DOMAIN" "$STAGING_APP_DOMAIN" ;;
    all)
        configure "production" "production" "false" "$PROD_MARKETING_DOMAIN" "$PROD_APP_DOMAIN"
        configure "staging" "staging" "true" "$STAGING_MARKETING_DOMAIN" "$STAGING_APP_DOMAIN"
        ;;
    --help|-h) echo "Usage: $0 [production|staging|all]"; exit 0 ;;
    *) err "Unknown target: $target (use production | staging | all)"; exit 1 ;;
esac

echo ""
ok "marketing variables set."
echo ""
warn "Secrets are NOT set by this script — add them manually (per environment):"
echo "  # A key unique to the marketing service:"
echo "  railway variable set -s ${RAILWAY_MARKETING_SERVICE} -e production APP_KEY=base64:\$(php artisan key:generate --show | sed 's/^base64://')"
echo "  # Reference the token already set on the main app's web service (stays in sync,"
echo "  # no secret copy/paste). Single-quote so the reference reaches Railway literally:"
echo "  railway variable set -s ${RAILWAY_MARKETING_SERVICE} -e production INTERNAL_API_TOKEN='\${{${RAILWAY_WEB_SERVICE}.INTERNAL_API_TOKEN}}'"
echo "  (repeat both for -e staging)"
echo ""
echo "Also (dashboard): set this service's Source = claryeo-marketing repo,"
echo "Dockerfile target 'railway', Healthcheck Path /up, add the root + www domains,"
echo "and attach a volume (content/users/storage) OR enable Statamic Git automation."
