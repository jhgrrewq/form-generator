#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const symlink = promisify(fs.symlink)

const IS_WINDOWS = process && (process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE))

// Always use "junctions" on Windows. Even though support for "symbolic links" was added in Vista+, users by default
// lack permission to create them
const symlinkType = IS_WINDOWS ? 'junction' : 'dir'

async function symlinkDir(src, dest) {
  if (src === dest) throw new Error(`Symlink path is the same as the target path (${src})`)
  try {
    return await symlink(src, dest, symlinkType)
  } catch (err) {
    throw err
  }
}
async function command() {
  const { stdout } = await exec('lerna list')
  // console.log("linkPackages:::stdout:", stdout)
  // /usr/local/lib/node_modules/@cci/cp-input-popup
  const modulesDir = path.resolve(__dirname, '../node_modules')
  const cciDir = path.resolve(__dirname, '../node_modules/@cci')
  if (!fs.existsSync(modulesDir)) {
    fs.mkdirSync(modulesDir)
  }
  if (!fs.existsSync(cciDir)) {
    fs.mkdirSync(cciDir)
  }
  stdout.split('\n')
    .filter(packageName => {
      const dest = path.resolve(path.join(modulesDir, packageName))
      return packageName && !fs.existsSync(dest)
    })
    .forEach(packageName => {
      if (packageName) {
        const src = path.resolve(__dirname, '../packages', packageName.substring(5))
        const dest = path.resolve(path.join(modulesDir, packageName))
        symlinkDir(src, dest).catch((err) => {
          console.log(err)
        })
      }
    })
}

command().catch(err => {
  console.error(err)
  process.exit(1)
})

