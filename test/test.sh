#!/usr/bin/env bash
set -euo pipefail

function textconv () {
  GIT_PREFIX=fake bin/prettier-diff.js $1
}

# I had some trouble getting `git diff` to use the textconv, so just emulate it with tempfiles.
function prettierDiff () {
  first=$(mktemp)
  second=$(mktemp)

  textconv $1 > $first
  textconv $2 > $second

  git diff --no-index $first $second || true

  rm -f $first $second
}

function assertEmptyPrettierDiff () {
  prettierDiff $1 $2 | tee /dev/stderr | wc -l | grep ' 0' >/dev/null
}

function containsOnce () {
  cat | grep "$1" | wc -l | grep ' 1$' >/dev/null
}

assertEmptyPrettierDiff test/js.js test/js.uglified.js
assertEmptyPrettierDiff test/json.json test/json.uglified.json
assertEmptyPrettierDiff test/xregexp.js test/xregexp.uglified.js
prettierDiff test/1.json test/2.json | containsOnce key1
prettierDiff test/1.js test/2.js | containsOnce key1
echo '{"k": 2}' | textconv - | wc -c | grep ' 15$' >/dev/null
