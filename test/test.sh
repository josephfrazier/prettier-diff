#!/usr/bin/env bash
set -euo pipefail

./node_modules/.bin/prettier_d stop >/dev/null
./node_modules/.bin/prettier_d start >/dev/null

function textconv () {
  bin/textconv-prettier.sh $1
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
textconv test/k2.json | wc -c | grep ' 14$' >/dev/null
