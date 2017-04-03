#!/usr/bin/env bash
set -euo pipefail

function assertEmptyPrettierDiff () {
  ./prettier-diff $1 $2 | tee /dev/stderr | wc -l | grep ' 0' >/dev/null
}

function containsOnce () {
  cat | grep "$1" | wc -l | grep ' 1$' >/dev/null
}

./prettier-diff --version | containsOnce "$(grep version package.json | cut -d '"' -f 4)"
assertEmptyPrettierDiff test/js.js test/js.uglified.js
assertEmptyPrettierDiff test/json.json test/json.uglified.json
./prettier-diff test/1.json test/2.json | containsOnce key1
./prettier-diff test/1.json test/2.json | containsOnce '^    "key1"'
./prettier-diff test/1.js test/2.js | containsOnce '^        key1'
./prettier-diff test/1.js test/2.js | grep '        ],' | wc -l | grep ' 2$' >/dev/null
./prettier-diff f763ab1dd2bf1b9f05865254aa843cffb061d943^ f763ab1dd2bf1b9f05865254aa843cffb061d943 | containsOnce 'added: .eslintrc.js'
