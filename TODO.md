# TODO

* Improve JSON formatting
  * See https://github.com/prettier/prettier/issues/322
  * Maybe run one of these after json-stable-stringify?
    * https://www.npmjs.com/package/json-align
    * https://www.npmjs.com/package/json-stringify-pretty-compact
* Ignore files marked as binary in .gitattributes
  * Example: https://github.com/josephfrazier/octopermalinker
  * `prettier-diff 3fec497b4675f22c417a95f4b7947e06ed7b9179^ 3fec497b4675f22c417a95f4b7947e06ed7b9179`
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
