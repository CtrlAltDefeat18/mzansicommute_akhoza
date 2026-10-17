#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
# Installation must never apply migrations or run an undefined check script.
npm ci --no-audit --no-fund
