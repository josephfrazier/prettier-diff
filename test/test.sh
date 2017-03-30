#!/usr/bin/env bash
set -euo pipefail

export PATH=./bin:./node_modules/.bin:$PATH

sed '/^$/d' index.js > test/index.js.noblanks
uglifyjs --comments all test/index.js.noblanks > test/index.js.uglified
prettier-diff test/index.js.noblanks test/index.js.uglified
rm test/index.js.noblanks test/index.js.uglified
