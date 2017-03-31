const prettier = require('prettier');
const stringify = require('json-stable-stringify');
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
  let fromPretty = fromContent;
  let toPretty = toContent;

  // try to format JS files
  try {
    fromPretty = prettier.format(fromContent, prettierOptions);
    toPretty = prettier.format(toContent, prettierOptions);
  } catch (err) {}

  // try to format JSON files
  // prettier doesn't do this currently: https://github.com/prettier/prettier/issues/322
  try {
    fromPretty = stringify(JSON.parse(fromContent), { space: 2 });
    toPretty = stringify(JSON.parse(toContent), { space: 2 });
  } catch (err) {}

  const patch = diff.createTwoFilesPatch(
    fromPath,
    toPath,
    fromPretty,
    toPretty
  );

  return { fromPretty: fromPretty, toPretty: toPretty, patch: patch };
};
