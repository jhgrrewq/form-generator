// create package.json and README for packages that don't have one yet

const fs = require('fs')
const path = require('path')
const baseVersion = require('../package.json').version

const packagesDir = path.resolve(__dirname, '../packages')
const files = fs.readdirSync(packagesDir)
function buildCpName(name) {
  return name.substring(0, 3) !== 'cp-' ? 'cp' + name.replace(/([A-Z])/g, function($1) { return '-' + $1.toLocaleLowerCase() }) : name
}
files.forEach(pkg => {
  if (pkg.charAt(0) === '.') return
  if (!fs.lstatSync(path.join(packagesDir, pkg)).isDirectory()) {
    return
  }
  const cpName = buildCpName(pkg)
  const desc = `${pkg} component for CCI CUI`

  const pkgPath = path.join(packagesDir, pkg, `package.json`)
  if (!fs.existsSync(pkgPath)) {
    const json = {
      'name': `@cci/${cpName}`,
      'version': baseVersion,
      'description': desc,
      'main': 'index.js',
      'publishConfig': {
        'access': 'public'
      },
      'repository': {
        'type': 'git',
        'url': 'ssh://git@git.citycloud.com.cn:3022/hufei/ccp.git'
      },
      'keywords': [
        'vue',
        'dataShow'
      ],
      'author': 'HF',
      'license': 'MIT',
      'bugs': {
        'url': 'https://git.citycloud.com.cn:3000/hufei/ccp'
      },
      'homepage': 'https://git.citycloud.com.cn:3000/hufei/ccp/src/master/CHANGELOG.md'
    }
    fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2))
  }

  const readmePath = path.join(packagesDir, pkg, `README.md`)
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `# @cci/${cpName}\n\n> ${desc}`)
  }

  const npmIgnorePath = path.join(packagesDir, pkg, `.npmignore`)
  if (!fs.existsSync(npmIgnorePath)) {
    fs.writeFileSync(npmIgnorePath, `__tests__/\n__mocks__/`)
  }
})
