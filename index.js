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
    fromPretty = jsonPrettify(fromContent);
    toPretty = jsonPrettify(toContent);
  } catch (err) {}

  const patch = diff.createTwoFilesPatch(
    fromPath,
    toPath,
    fromPretty,
    toPretty
  );

  return { fromPretty, toPretty, patch };
};

function jsonPrettify(jsonString) {
  const sorted = stringify(JSON.parse(jsonString), { space: 2 });
  // Put a comma after strings, numbers, objects, arrays, `true`, `false`, or
  // `null` at the end of a line. See the grammar at http://json.org/
  return sorted.replace(/(["\d}\]el])$/gm, '$1,');
}
