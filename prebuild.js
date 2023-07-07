// we'll package up all build time info into the /assets/version.json file

const fs = require('fs')

const revision = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString().trim()

const commitTime = require('child_process')
  .execSync('git log -1 --format="%at" | xargs -I{} date -d @{} +%d.%m.%Y_%H:%M:%S')
  .toString().trim().split('_').join(' ')

const commitMessage = require('child_process')
  .execSync('git log -1 --pretty=%B')
  .toString().trim()

const commitAuthor = require('child_process')
  .execSync('git log -1 --pretty=format:\'%ae\'')
  .toString().trim()

const data = {
  '_': 'DO NOT CHANGE THIS FILE MANUALLY. THIS FILE WILL GET FILLED IN AT BUILD/DEPLOY TIME. LEAVE ALL FIELDS AT <unknown> SO WE CAN SEE IF FIELDS DID NOT GET POPULATED DURING DEPLOYMENT.',
  version: process.env.npm_package_version,
  revision,
  commitTime,
  commitMessage,
  commitAuthor,
  buildTime: new Date().toLocaleString('de').replace(',', ''),
  buildId: process.env.BUILD_ID ?? '<unknown>',
  buildContext: process.env.CONTEXT ?? '<unknown>',
  buildNodeVersion: process.env.NODE_VERSION ?? '<unknown>',
  buildYarnVersion: process.env.YARN_VERSION ?? '<unknown>',
  deployId: process.env.DEPLOY_ID ?? '<unknown>',
  deployUrl: process.env.DEPLOY_URL ?? '<unknown>'
}

fs.writeFileSync('./assets/version.json', JSON.stringify(data, null, 2))
