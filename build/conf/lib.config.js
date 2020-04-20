const path = require('path')
function resolve(target) {
  return path.resolve(__dirname, '../../', target)
}
module.exports = {
  outputDir: resolve('lib'),
  chainWebpack: chain => {
    chain.externals({
      "@cci/cui": true
    })
    chain.module
      .rule('vue')
      .include
      .add(/packages/)
      .add(/@cci\/cp-/)
      .end()
    // chain.entryPoints.clear()
    // chain.entry('cui-cp').add(resolve('packages/index.js'))
    // console.dir(chain)
  },
  configureWebpack: function(config) {
    // config.entry = {
    //     'cui-cp': resolve('packages/index.js')
    // }
    console.log(config.module.rules[12])
    console.log(config.entry)
    return config
  }
}
