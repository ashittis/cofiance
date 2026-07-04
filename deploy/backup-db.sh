#!/usr/bin/env bash
# Nightly PostgreSQL backup for Confiance Services (no RDS, so back up yourself).
# Keeps the last 14 days of dumps in ~/backups.
#
# One-time setup on the server:
#   chmod +x ~/cofiance/deploy/backup-db.sh
#   (crontab -l 2>/dev/null; echo "0 2 * * * ~/cofiance/deploy/backup-db.sh") | crontab -
#
# Restore a dump into a fresh DB:
#   psql -U confiance confiance < ~/backups/confiance-YYYY-MM-DD.sql

set -euo pipefail

DB_NAME="confiance"
DB_USER="confiance"
OUT_DIR="$HOME/backups"
STAMP="$(date +%F)"

mkdir -p "$OUT_DIR"
pg_dump -U "$DB_USER" "$DB_NAME" > "$OUT_DIR/${DB_NAME}-${STAMP}.sql"

# prune backups older than 14 days
find "$OUT_DIR" -name "${DB_NAME}-*.sql" -mtime +14 -delete
