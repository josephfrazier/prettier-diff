# TODO

* Have `prettier-diff` stop `prettier_d` after running?
  * Also think about scoping this `prettier_d` non-globally
* Support git-integrated usage without having to run `prettier-diff` first
  * This basically means that the textconv needs to start `prettier_d`
* Preprocess Markdown by putting each sentence on its own line.
  * https://news.ycombinator.com/item?id=4642395
* Figure out if it's possible to support `prettier-diff --no-index`
* Consider using this prettier fork: https://github.com/arijs/prettier-miscellaneous
  * It's got some extra options that might be nice
