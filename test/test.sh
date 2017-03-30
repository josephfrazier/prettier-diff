#!/usr/bin/env bash
set -euo pipefail

./node_modules/.bin/uglifyjs --comments all index.js > test/index.js.uglified
./bin/prettier-diff index.js test/index.js.uglified
rm test/index.js.uglified
