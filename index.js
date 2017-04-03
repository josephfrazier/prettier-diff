const prettier = require('prettier')
const stringify = require('json-stable-stringify')
const diff = require('diff')

module.exports = function (
  {
    fromPath,
    toPath,
    fromContent,
    toContent,
    fromPrettierOptions,
    toPrettierOptions
  }
) {
  fromContent = fromContent.toString()
  toContent = toContent.toString()

  let fromPretty = prettify(fromContent, fromPrettierOptions)
  let toPretty = prettify(toContent, toPrettierOptions)

  const patch = diff.createTwoFilesPatch(
    fromPath,
    toPath,
    fromPretty,
    toPretty
  )

  return {fromPretty, toPretty, patch}
}

function jsonPrettify (jsonString, prettierOptions) {
  const sorted = stringify(JSON.parse(jsonString), {
    space: prettierOptions.tabWidth
  })
  // Put a comma after strings, numbers, objects, arrays, `true`, `false`, or
  // `null` at the end of a line. See the grammar at http://json.org/
  return sorted.replace(/(["\d}\]el])$/gm, '$1,')
}

function prettify (content, prettierOptions) {
  let pretty = content

  // try to format JS files
  try {
    pretty = prettier.format(content, prettierOptions)
  } catch (err) {}

  // try to format JSON files
  // prettier doesn't do this currently: https://github.com/prettier/prettier/issues/322
  try {
    pretty = jsonPrettify(content, prettierOptions)
  } catch (err) {}

  return pretty
}
