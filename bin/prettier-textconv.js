#!/usr/bin/env node

const rw = require('rw').dash
const prettier = require('prettier')
const stringify = require('json-stable-stringify')

// https://github.com/prettier/prettier/tree/a707dda53b13a6956a825609f30baead7ef08a59#api
const prettierOptions = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true
}

const content = rw.readFileSync(process.argv[2]).toString()
let pretty = content

// try to format JS files
try {
  pretty = prettier.format(content, prettierOptions)
} catch (err) {}

// try to format JSON files
// prettier doesn't do this currently: https://github.com/prettier/prettier/issues/322
try {
  const sorted = stringify(JSON.parse(content), {
    space: prettierOptions.tabWidth
  })
  // Put a comma after strings, numbers, objects, arrays, `true`, `false`, or
  // `null` at the end of a line. See the grammar at http://json.org/
  pretty = sorted.replace(/(.["\d}\]el])$/gm, '$1,')
} catch (err) {}

console.log(pretty)
