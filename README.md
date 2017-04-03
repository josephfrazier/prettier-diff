# prettier-diff

`prettier-diff` is a wrapper around [diff-so-fancy] that preprocesses JavaScript and JSON files to reduce the number of formatting changes that appear in the diff.
This allows you to focus on the semantic changes, which is useful when viewing diffs that also have formatting changes.

JavaScript is preprocessed with [prettier], and JSON is preprocessed with [json-stable-stringify].

[diff-so-fancy]: https://github.com/so-fancy/diff-so-fancy
[prettier]: https://github.com/prettier/prettier
[json-stable-stringify]: https://github.com/substack/json-stable-stringify

## Install

You can use [yarn] or [npm] to install `prettier-diff`:

```bash
yarn global add prettier-diff
# or
npm install --global prettier-diff
```

Note that you'll also need to have [git] installed, since it provides the input for `diff-so-fancy`.

[yarn]: https://yarnpkg.com/en/docs/getting-started
[npm]: https://www.npmjs.com/get-npm
[git]: https://git-scm.com/

## Use

You can use `prettier-diff` instead of `diff` or `git diff`:

```bash
prettier-diff path/to/first/file path/to/second/file
prettier-diff # works like `git diff`
```

## Example

For example, this repository contains a large commit that rewrote most of its code with [prettier-standard], and also renames a variable. You can see the commit on GitHub here: [8cc0119]

With `prettier-diff`, only the renaming is shown:

```bash
prettier-diff 8cc0119^ 8cc0119
```

![screenshot of `prettier-diff 8cc0119^ 8cc0119`](screenshot.png)

[prettier-standard]: https://github.com/sheerun/prettier-standard
[8cc0119]: https://github.com/josephfrazier/prettier-diff/commit/8cc0119e3969132670e6b13cde1583280fababa5
