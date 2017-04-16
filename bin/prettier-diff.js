#!/usr/bin/env node

const os = require('os')
const path = require('path')
const fse = require('fs-extra')
const sh = require('shell-tag')
const stableSort = require('stable')
const cp = require('child_process')

const args = process.argv.slice(2)

const textconvPath = path.resolve(__dirname, 'textconv-prettier.sh')
const gitDirPath = sh`git rev-parse --git-dir`.trim()

const gitAttributesPath = gitDirPath + '/info/attributes'
const dotGitAttributesPath = gitDirPath + '/../.gitattributes'
fse.closeSync(fse.openSync(gitAttributesPath, 'a')) // ensure attributes file exists
const gitAttributesPathBackup = gitAttributesPath + '.prettier-diff'
fse.copySync(gitAttributesPath, gitAttributesPathBackup)

const gitConfigPath = gitDirPath + '/config'
const gitConfigPathBackup = gitConfigPath + '.prettier-diff'
fse.copySync(gitConfigPath, gitConfigPathBackup)

const prettierdDotfilePath = path.resolve(os.homedir(), '.prettier_d')
if (!fse.existsSync(prettierdDotfilePath)) {
  const prettierdPath = path.resolve(
    __dirname,
    '..',
    'node_modules',
    '.bin',
    'prettier_d'
  )
  sh`${prettierdPath} start`
}

try {
  sh`git config diff.prettier.textconv ${textconvPath}`
  const dotGitAttributesContent = fse.existsSync(dotGitAttributesPath)
    ? fse.readFileSync(dotGitAttributesPath).toString()
    : ''
  fse.appendFileSync(
    gitAttributesPath,
    `* diff=prettier\n${dotGitAttributesContent}`
  )

  const sortedArgs = stableSort(
    args,
    (a, b) => !a.startsWith('-') && b.startsWith('-')
  )
  cp.spawnSync(
    'git',
    ['diff', '--ignore-space-change', '--ignore-blank-lines'].concat(
      sortedArgs
    ),
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
