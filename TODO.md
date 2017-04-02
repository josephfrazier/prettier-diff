# TODO

* Allow git-like usage: prettier-diff head^ bin/pretter-diff
  * should be possible by executing git difftool if not already a difftool
* Parse `prettier` options from .editorconfig files
  * https://github.com/editorconfig/editorconfig-core-js
  * https://github.com/prettier/prettier/search?q=editorconfig&type=Issues&utf8=%E2%9C%93
* Try different line lengths to minimize diff size, since wrapping can produces non-semantic diffs
