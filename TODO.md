# TODO

* Sort CLI arguments to put options first
  * `git` is a stickler about it, and `thefuck` doesn't understand prettier-diff
* Preprocess Markdown by putting each sentence on its own line.
  * https://news.ycombinator.com/item?id=4642395
* Figure out if it's possible to support `prettier-diff --no-index`
* Consider using this prettier fork: https://github.com/arijs/prettier-miscellaneous
  * It's got some extra options that might be nice
* Make diffing multiple files faster. It's slow in part because the code takes
  some time to load. If we can get the non-difftool wrapper to start up a
  separate prettier process, then reuse it for multiple files, this should help
  things.
  * https://github.com/prettier/prettier/pull/753
  * https://github.com/substack/dnode
  * This makes it a little faster:

    `(echo '#!/usr/bin/env node' && browserify --node prettier-diff.js --ignore-missing) | sponge prettier-diff.js`
