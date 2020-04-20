const fs = require('fs')
const path = require('path')
const packagesDir = path.resolve(__dirname, '../packages')
const exclude = ['index.js', 'cp-theme-default', 'cp-demo']
const Components = fs.readdirSync(packagesDir).filter(name => { return name.substring(0, 3) === 'cp-' && !~exclude.indexOf(name) })

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) {
    return false
  }
}
const theme = 'cp-theme-default'
let indexContent = '@import "./base.scss";\n'
Components.forEach(function(key) {
  const fileName = key + '.scss'
  indexContent += '@import "./' + fileName + '";\n'
  const filePath = path.resolve(packagesDir, theme, 'src', fileName)
  if (!fileExists(filePath)) {
    fs.writeFileSync(filePath, '', 'utf8')
    console.log(theme, ' 创建遗漏的 ', fileName, ' 文件')
  }
})
fs.writeFileSync(path.resolve(packagesDir, theme, 'src', 'index.scss'), indexContent)
