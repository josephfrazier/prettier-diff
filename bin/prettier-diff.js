#!/usr/bin/env node

const args = process.argv.slice(2)

// if run directly, rather than by git,
// set up git config/attributes then pass args to `git diff`
if (process.env.GIT_PREFIX === undefined) {
  const fse = require('fs-extra')
  const sh = require('shell-tag')
  const cp = require('child_process')

  const textconvPath = __filename
  const gitDirPath = sh`git rev-parse --git-dir`.trim()

  const gitAttributesPath = gitDirPath + '/info/attributes'
  const dotGitAttributesPath = gitDirPath + '/../.gitattributes'
  fse.closeSync(fse.openSync(gitAttributesPath, 'a')) // ensure attributes file exists
  const gitAttributesPathBackup = gitAttributesPath + '.prettier-diff'
  fse.copySync(gitAttributesPath, gitAttributesPathBackup)

  const gitConfigPath = gitDirPath + '/config'
  const gitConfigPathBackup = gitConfigPath + '.prettier-diff'
  fse.copySync(gitConfigPath, gitConfigPathBackup)

  try {
    sh`git config diff.prettier.textconv ${textconvPath}`
    const dotGitAttributesContent = fse.existsSync(dotGitAttributesPath)
      ? fse.readFileSync(dotGitAttributesPath).toString()
      : ''
    fse.appendFileSync(
      gitAttributesPath,
      `* diff=prettier\n${dotGitAttributesContent}`
    )
    cp.spawnSync(
      'git',
      ['diff', '--ignore-space-change', '--ignore-blank-lines'].concat(args),
      {
        stdio: 'inherit'
      }
    )
  } catch (err) {
    // nothing to do here
  } finally {
    fse.renameSync(gitAttributesPathBackup, gitAttributesPath)
    fse.renameSync(gitConfigPathBackup, gitConfigPath)
  }
} else {
  const rw = require('rw').dash
  const prettier = require('prettier')
  const stringifySorted = require('json-stable-stringify')
  const stringifyAligned = require('json-align')

  // https://github.com/prettier/prettier/tree/a707dda53b13a6956a825609f30baead7ef08a59#api
  const prettierOptions = {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    semi: false
  }

  const content = rw.readFileSync(args[0] || '-').toString()
  let pretty = content

  // try to format JS files
  try {
    pretty = prettier.format(content, prettierOptions)
  } catch (err) {
    // try to format JSON files
    // prettier doesn't do this currently: https://github.com/prettier/prettier/issues/322
    try {
      const sorted = stringifyAligned(
        JSON.parse(stringifySorted(JSON.parse(content))),
        null,
        prettierOptions.tabWidth,
        true
      )
      // Put a comma after strings, numbers, objects, arrays, `true`, `false`, or
      // `null` at the end of a line. See the grammar at http://json.org/
      pretty = sorted.replace(/(.["\d}\]el])$/gm, '$1,')
    } catch (err) {}
  }

  console.log(pretty)
}
