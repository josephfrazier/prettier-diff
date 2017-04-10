# prettier-diff

`prettier-diff` is a `git diff` wrapper that preprocesses JavaScript and JSON files to reduce the number of formatting changes that appear in the diff.
This allows you to focus on the semantic changes, which is useful when viewing diffs that also have formatting changes.

JavaScript is preprocessed with [prettier], and JSON is preprocessed with [json-stable-stringify].

[textconv]: https://git.wiki.kernel.org/index.php/Textconv
[prettier]: https://github.com/prettier/prettier
[json-stable-stringify]: https://github.com/substack/json-stable-stringify

## Install

You can use [yarn] or [npm] to install `prettier-diff`:

```bash
yarn global add prettier-diff
# or
npm install --global prettier-diff
```

## Use

### One-off usage

In any git repository, just use `prettier-diff` instead of `git diff`:

```bash
# instead of
git diff head^^
# do this
prettier-diff head^^
```

Behind the scenes, `prettier-diff` temporarily modifies the `.git/config` and `.git/info/attributes` files to set up the preprocessing by defining a [textconv] for `*.js` and `*.json` files.

### `git diff` integration

To always use `prettier-diff` as part of `git diff` in a given repository, you can run the following:

```bash
git config diff.prettier.textconv prettier-diff
git config diff.prettier.cachetextconv true

echo '*.js diff=prettier' >> .gitattributes
echo '*.json diff=prettier' >> .gitattributes
```

Now, `git diff` will automatically run `prettier-diff` on your JS/JSON files, and it plays well with the other `git diff` options like `--ignore-all-space`, as well as [diff-so-fancy].
See here for more information: [textconv]

[yarn]: https://yarnpkg.com/en/docs/getting-started
[npm]: https://www.npmjs.com/get-npm
[diff-so-fancy]: https://github.com/so-fancy/diff-so-fancy
[textconv]: https://git.wiki.kernel.org/index.php/Textconv

## Example

For example, this repository contains a large commit that rewrote most of its code with [prettier-standard], and also renames a variable. You can see the commit on GitHub here: [8cc0119]

With `prettier-diff` configured, only the renaming is shown:

```bash
git diff --color 8cc0119^ 8cc0119 | diff-so-fancy
```

![screenshot of `prettier-diff 8cc0119^ 8cc0119`](screenshot.png)

[prettier-standard]: https://github.com/sheerun/prettier-standard
[8cc0119]: https://github.com/josephfrazier/prettier-diff/commit/8cc0119e3969132670e6b13cde1583280fababa5
