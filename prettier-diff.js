#!/usr/bin/env node

const fse = require('fs-extra')
const sh = require('shell-tag')
const cp = require('child_process')
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

// if run directly, rather than by git,
// set up git config/attributes then pass args to `git diff`
if (process.env.GIT_PREFIX === undefined) {
  const gitDirPath = sh`git rev-parse --git-dir`.trim()

  const gitAttributesPath = gitDirPath + '/info/attributes'
  fse.closeSync(fse.openSync(gitAttributesPath, 'a')) // ensure attributes file exists
  const gitAttributesPathBackup = gitAttributesPath + '.prettier-diff'
  fse.copySync(gitAttributesPath, gitAttributesPathBackup)

  const gitConfigPath = gitDirPath + '/config'
  const gitConfigPathBackup = gitConfigPath + '.prettier-diff'
  fse.copySync(gitConfigPath, gitConfigPathBackup)

  try {
    sh`git config diff.prettier.textconv prettier-diff`
    fse.appendFileSync(gitAttributesPath, '\n*.js diff=prettier\n')
    fse.appendFileSync(gitAttributesPath, '\n*.json diff=prettier\n')
    cp.spawnSync('git', ['diff'].concat(process.argv.slice(2)), {
      stdio: 'inherit'
    })
  } catch (err) {
    // nothing to do here
  } finally {
    fse.renameSync(gitAttributesPathBackup, gitAttributesPath)
    fse.renameSync(gitConfigPathBackup, gitConfigPath)
  }
  process.exit()
}

const content = fse.readFileSync(process.argv[2]).toString()
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
  pretty = sorted.replace(/(["\d}\]el])$/gm, '$1,')
} catch (err) {}

console.log(pretty)
