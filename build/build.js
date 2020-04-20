const Service = require('@vue/cli-service')
const path = require('path')

const chainWebpack = (chain) => {
  chain.module
    .rule('vue')
    .include
    .add(path.resolve(__dirname, '../packages/'))
    .end()
    // .clear()
    // .add(/@cci\/cp-/)
    // .exclude
    // .add(/node_modules/)
    // .end()

  // chain.entryPoints.clear()

  return chain
}
const configureWebpack = function(config) {
  // console.log("configureWebpack:::::::", config.module.rules)
  // config.externals = [
  //   function(context, request, callback) {
  //     console.log('onfigureW;;;;;', request)
  //     if (/^yourregex$/.test(request)) {
  //       return callback(null, 'commonjs ' + request)
  //     }
  //     callback()
  //   }
  // ]
  // config.externals =
  console.log("configureWebpack:::::::", config.externals)

  return {
    externals: config.externals ? [
      config.externals,
      {
        "@cci/cui": true
      },
      /^@cci\/cp-/
    ] : [{
      "@cci/cui": true
    },
    /^@cci\/cp-/]
  }
}
function build({
  outputDir, entry, name, formats = "umd"
}) {
  const service = new Service(path.resolve(__dirname, '../'), {
    inlineOptions: { outputDir, chainWebpack, configureWebpack },
    useBuiltIn: true
  })
  return service.run('build', { target: "app", entry, name, formats }).catch(error => {
    console.log(error)
    process.exit(1)
  })
}

module.exports = build
