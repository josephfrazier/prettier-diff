#!/usr/bin/env bash
set -euo pipefail

function assertEmptyPrettierDiff () {
  ./bin/prettier-diff $1 $2 | tee /dev/stderr | wc -l | ag ' 0' >/dev/null
}

assertEmptyPrettierDiff test/js.js test/js.js.uglified
assertEmptyPrettierDiff test/json.json test/json.json.uglified
