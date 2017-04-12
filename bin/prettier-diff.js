#!/usr/bin/env node

const fse = require('fs-extra')
const path = require('path')
const sh = require('shell-tag')
const cp = require('child_process')

const textconvPath = path.resolve(__dirname, 'prettier-textconv.js')
const args = process.argv.slice(2)

// set up git config/attributes then pass args to `git diff`
const gitDirPath = sh`git rev-parse --git-dir`.trim()

const gitAttributesPath = gitDirPath + '/info/attributes'
fse.closeSync(fse.openSync(gitAttributesPath, 'a')) // ensure attributes file exists
const gitAttributesPathBackup = gitAttributesPath + '.prettier-diff'
fse.copySync(gitAttributesPath, gitAttributesPathBackup)

const gitConfigPath = gitDirPath + '/config'
const gitConfigPathBackup = gitConfigPath + '.prettier-diff'
fse.copySync(gitConfigPath, gitConfigPathBackup)

try {
  sh`git config diff.prettier.textconv ${textconvPath}`
  fse.appendFileSync(gitAttributesPath, '\n* diff=prettier\n')
  cp.spawnSync('git', ['diff'].concat(args), {
    stdio: 'inherit'
  })
} catch (err) {
  // nothing to do here
} finally {
  fse.renameSync(gitAttributesPathBackup, gitAttributesPath)
  fse.renameSync(gitConfigPathBackup, gitConfigPath)
}
