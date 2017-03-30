#!/usr/bin/env bash
set -euo pipefail

sed '/^$/d' index.js > test/index.js.noblanks
./node_modules/.bin/uglifyjs --comments all test/index.js.noblanks > test/index.js.uglified
./bin/prettier-diff test/index.js.noblanks test/index.js.uglified
rm test/index.js.noblanks test/index.js.uglified
