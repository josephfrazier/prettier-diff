# TODO

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
