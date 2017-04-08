# TODO

* Make diffing multiple files faster. Currently, prettier takes a while to
  format the "from" file, but is fast on the "to" file. This is because the
  code takes some time to load. If we can get the non-difftool wrapper to start
  up a separate prettier process, then reuse it for multiple files, this should
  help things.
  * https://github.com/prettier/prettier/pull/753
  * https://github.com/substack/dnode
* Consider using this prettier fork: https://github.com/arijs/prettier-miscellaneous
  * It's got some extra options that might be nice
* Add a --no-fancy option for plain text output
  * Note that the output wouldn't apply as a patch, but could be useful for pasting into plain text mediums
* Try different line lengths to minimize diff size, since wrapping can produces non-semantic diffs
