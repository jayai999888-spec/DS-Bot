#!/bin/sh
# Build the desktop app from this checkout and install it over /Applications/橘巴拉Bot.app.
#
#   scripts/deploy-mac.sh
#
# app/node_modules/ds-bot is a copy that `npm ci` makes of ../ds-bot, not a link, so the
# app's packages are installed again on every run; packing alone would ship the old plugin.
# The team's data stays in its own DSH_HOME; only the app bundle is replaced.
set -eu

root="$(git rev-parse --show-toplevel)"
target="/Applications/橘巴拉Bot.app"
bundle_id="io.github.jayai999888.jubalabot"

cd "$root/ds-bot"
npm run build
cd "$root/app"
npm ci
cmp -s node_modules/ds-bot/client.js ../ds-bot/client.js || { echo "deploy: app/node_modules/ds-bot is stale" >&2; exit 1; }
rm -rf dist-pack
npm run pack
built="$root/app/dist-pack/mac-arm64/橘巴拉Bot.app"
[ -d "$built" ] || built="$root/app/dist-pack/mac/橘巴拉Bot.app"
[ -d "$built" ] || { echo "deploy: no app bundle in app/dist-pack" >&2; exit 1; }

if pgrep -f "$target/Contents/MacOS" >/dev/null; then
  osascript -e "tell application id \"$bundle_id\" to quit" || true
  tries=0
  while pgrep -f "$target/Contents/MacOS" >/dev/null; do
    tries=$((tries + 1))
    [ "$tries" -le 30 ] || { echo "deploy: 橘巴拉Bot did not quit; quit it and run again" >&2; exit 1; }
    sleep 1
  done
fi

rm -rf "$target"
ditto "$built" "$target"
open "$target"
version="$(/usr/libexec/PlistBuddy -c 'Print CFBundleShortVersionString' "$target/Contents/Info.plist")"
echo "deploy: installed 橘巴拉Bot $version ($(git rev-parse --short HEAD)) and started it"
