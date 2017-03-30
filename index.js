#!/usr/bin/env node

const fs = require('fs');
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

  return { fromPretty, toPretty, patch };
};
