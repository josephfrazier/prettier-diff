# TODO

* Allow git-like usage: prettier-diff head^ bin/pretter-diff
  * should be possible by executing git difftool if not already a difftool
* Try different line lengths to minimize diff size, since wrapping can produces non-semantic diffs
* Consider handling JSON diffs: see https://github.com/prettier/prettier/issues/322
  * with https://github.com/lydell/json-stringify-pretty-compact
  * with https://www.npmjs.com/package/json-align
