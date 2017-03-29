#!/usr/bin/env node

const fs = require('fs')
const child_process = require('child_process')
const prettier = require('prettier')
const tempfile = require('tempfile')

const [fromPath, toPath] = process.argv.slice(2)

// https://github.com/prettier/prettier/tree/a707dda53b13a6956a825609f30baead7ef08a59#api
const prettierOptions = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
}

let fromContent = fs.readFileSync(fromPath).toString()
let toContent = fs.readFileSync(toPath).toString()

try {
  fromContent = prettier.format(fromContent, prettierOptions)
} catch (err) {}

try {
  toContent = prettier.format(toContent, prettierOptions)
} catch (err) {}

const [fromTmp, toTmp] = [tempfile(), tempfile()]

fs.writeFileSync(fromTmp, fromContent)
fs.writeFileSync(toTmp, toContent)

// Use `|| true` to eat failures.
// Don't use `| cat` because we want git diff colors to work if they are configured.
// https://stackoverflow.com/questions/255202/how-do-i-view-git-diff-output-with-a-visual-diff-program/255212#255212
child_process.execSync(`git diff --no-index "${fromTmp}" "${toTmp}" || true`, {
  stdio: 'inherit', // https://stackoverflow.com/questions/30134236/use-child-process-execsync-but-keep-output-in-console#comment61502598_31104898
})
