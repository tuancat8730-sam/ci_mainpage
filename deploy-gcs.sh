#!/bin/bash
# ============================================================
# Capital Irrigation (ci_mainpage) — Deploy to Firebase Hosting
# Usage: bash deploy-gcs.sh
# ============================================================

set -e

WEB_DIR="/home/tuancnh/code/ci_mainpage"

echo ""
echo "=========================================="
echo "  ci_mainpage — Firebase Hosting Deploy"
echo "=========================================="
echo ""

# ── Step 1: Build ──────────────────────────────────────────
echo "→ Building production bundle..."
cd "$WEB_DIR"
npm run build
echo "  ✓ Build complete → dist/"

# ── Step 2: Check Firebase CLI ─────────────────────────────
echo ""
echo "→ Checking Firebase CLI..."
if ! command -v firebase &>/dev/null; then
  echo "  Firebase CLI not found. Installing..."
  npm install -g firebase-tools
fi
echo "  ✓ Firebase CLI: $(firebase --version)"

# ── Step 3: Check auth ─────────────────────────────────────
echo ""
echo "→ Checking authentication..."
if ! firebase projects:list &>/dev/null; then
  echo "  Not logged in. Please run: firebase login"
  exit 1
fi
echo "  ✓ Authenticated"

# ── Step 4: Deploy to Firebase Hosting ─────────────────────
echo ""
echo "→ Deploying to Firebase Hosting..."
firebase deploy --only hosting
echo "  ✓ Deploy complete"

# ── Step 5: Print URLs ─────────────────────────────────────
echo ""
echo "=========================================="
echo "  ✅ DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "  Firebase URL:   https://ci-mainpage.web.app"
echo ""
echo "  To update: just run this script again"
echo "=========================================="
echo ""
