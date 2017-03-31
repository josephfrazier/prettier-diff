#!/usr/bin/env bash
set -euo pipefail

./bin/prettier-diff test/js.js test/js.js.uglified | tee /dev/stderr | wc -l | ag ' 0' >/dev/null
./bin/prettier-diff test/json.json test/json.json.uglified | tee /dev/stderr | wc -l | ag ' 0' >/dev/null
