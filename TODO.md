# TODO

* Add `--install` and `--uninstall` options for setting up git config/attributes
* Have `prettier-diff` stop `prettier_d` after running?
  * Also think about scoping this `prettier_d` non-globally
* Support git-integrated usage without having to run `prettier-diff` first
  * This basically means that the textconv needs to start `prettier_d`
* Preprocess Markdown by putting each sentence on its own line.
  * https://news.ycombinator.com/item?id=4642395
  * This textconv does a decent job, but it might just be better to use `git diff --color-words`
    * `cat $1 | sed 's/\. /\.\n/g' | sed 's/, /,\n/g'`
* Figure out if it's possible to support `prettier-diff --no-index`
* Consider using this prettier fork: https://github.com/arijs/prettier-miscellaneous
  * It's got some extra options that might be nice
