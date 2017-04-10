#!/usr/bin/env bash
set -euo pipefail

# I had some trouble getting `git diff` to use the textconv, so just emulate it with tempfiles.
function prettierDiff () {
  first=$(mktemp)
  second=$(mktemp)

  GIT_PREFIX=fake ./prettier-diff.js $1 > $first
  GIT_PREFIX=fake ./prettier-diff.js $2 > $second

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
prettierDiff test/1.json test/2.json | containsOnce key1
prettierDiff test/1.js test/2.js | containsOnce key1
