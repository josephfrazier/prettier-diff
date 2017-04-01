#!/usr/bin/env bash
set -euo pipefail

function assertEmptyPrettierDiff () {
  ./bin/prettier-diff $1 $2 | tee /dev/stderr | wc -l | grep ' 0' >/dev/null
}

assertEmptyPrettierDiff test/js.js test/js.js.uglified
assertEmptyPrettierDiff test/json.json test/json.json.uglified
./bin/prettier-diff test/1.json test/2.json | grep key1 | wc -l | grep ' 1$' >/dev/null
