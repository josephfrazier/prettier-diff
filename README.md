# prettier-diff

`prettier-diff` is a wrapper around [diff-so-fancy] that preprocesses JavaScript files with [prettier] to reduce the number of formatting changes that appear in the diff.
This allows you to focus on the semantic changes, which is useful when viewing diffs that also have formatting changes.

[diff-so-fancy]: https://github.com/so-fancy/diff-so-fancy
[prettier]: https://github.com/prettier/prettier

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

You can use `prettier-diff` instead of `diff`, or configure it as a git [difftool].

```bash
prettier-diff path/to/first/file path/to/second/file
git difftool --extcmd=prettier-diff
```

[difftool]: https://git-scm.com/docs/git-difftool

## Example

For example, here's what an older version of [index.js](index.js) looked like:

```js
const prettier = require('prettier');
const diff = require('diff');

// https://github.com/prettier/prettier/tree/a707dda53b13a6956a825609f30baead7ef08a59#api
const defaultPrettierOptions = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
};

module.exports = function(
  {
    fromPath,
    toPath,
    fromContent,
    toContent,
    prettierOptions = defaultPrettierOptions,
  }
) {
  let fromPretty, toPretty;

  try {
    fromPretty = prettier.format(fromContent, prettierOptions);
    toPretty = prettier.format(toContent, prettierOptions);
  } catch (err) {
    fromPretty = fromContent;
    toPretty = toContent;
  }

  const patch = diff.createTwoFilesPatch(
    fromPath,
    toPath,
    fromPretty,
    toPretty
  );

  return { fromPretty: fromPretty, toPretty: toPretty, patch: patch };
};
```

Here's the same file, but passed through `uglifyjs --comments all`:

```js
const prettier=require("prettier");const diff=require("diff");
// https://github.com/prettier/prettier/tree/a707dda53b13a6956a825609f30baead7ef08a59#api
const defaultPrettierOptions={printWidth:80,tabWidth:2,singleQuote:true,trailingComma:"all",bracketSpacing:true};module.exports=function({fromPath,toPath,fromContent,toContent,prettierOptions=defaultPrettierOptions}){let fromPretty,toPretty;try{fromPretty=prettier.format(fromContent,prettierOptions);toPretty=prettier.format(toContent,prettierOptions)}catch(err){fromPretty=fromContent;toPretty=toContent}const patch=diff.createTwoFilesPatch(fromPath,toPath,fromPretty,toPretty);return{fromPretty:fromPretty,toPretty:toPretty,patch:patch}};
```

Running `prettier-diff` on these two shows us that there is no semantic difference between them (the red blocks are where `uglifyjs` removed blank lines):

```bash
prettier-diff index.js test/index.js.uglified
```

![screenshot of `prettier-diff index.js test/index.js.uglified`](screenshot.png)
