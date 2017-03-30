#!/usr/bin/env bash
set -euo pipefail

export PATH=./bin:./node_modules/.bin:$PATH

uglifyjs --comments all index.js > test/index.js.uglified
prettier-diff index.js test/index.js.uglified
rm test/index.js.uglified
