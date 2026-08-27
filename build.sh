#!/usr/bin/env bash
set -euo pipefail

HUGO_VERSION="0.165.0"
export TZ=UTC

echo "--> Installing Hugo ${HUGO_VERSION}"
curl -sSL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" | tar -xz hugo
export PATH="$PWD:$PATH"
hugo version

echo "--> Fetching theme submodule"
git submodule update --init --recursive --depth 1
test -f themes/blowfish/theme.toml || { echo "ERROR: Blowfish submodule missing"; exit 1; }

echo "--> Building site"
hugo --gc --minify

test -f public/index.html || { echo "ERROR: build produced no index.html"; exit 1; }
echo "--> OK: $(find public -name '*.html' | wc -l) pages built"