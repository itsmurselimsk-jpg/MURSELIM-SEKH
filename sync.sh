#!/bin/bash
echo "🚀 Auto-Syncing FF SensiPro to GitHub..."
git add .
git commit -m "Auto update FF SensiPro: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
echo "✅ Pushed to GitHub! GitHub Actions will now automatically build & deploy."
