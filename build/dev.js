const path = require('path')
const pkg = require('../package.json')
const Service = require('@vue/cli-service')
const { applyMock } = require("./mock")

function chainWebpack(chain) {
  if (pkg && pkg.version) {
    chain.plugin('define')
      .tap(([options]) => {
        options['process.env']['VUE_APP_NAME'] = `"${pkg.name}"`
        options['process.env']['VUE_APP_VERSION'] = `"${pkg.version}"`
        return [options]
      })
  }

  chain.module
    .rule('vue')
    .include
    .add(/src/)
    .add(/packages/)
    .add(/@cci\/cp-/)
    .end()

  chain.plugin("html")
    .tap(args => {
      args[0].template = path.join(__dirname, '../demo/public/index.html')
      return args
    })

  chain.entryPoints.clear()
  chain.entry('index').add(path.resolve(__dirname, '../demo/index.js'))
  return chain
}

function configureWebpack(config) {
  return {
    resolve: {
      alias: {
        'packages': path.resolve(__dirname, '../packages')
      }
    }
  }
}

const service = new Service(path.resolve(__dirname, '../'), {
  outputDir: 'dist',
  inlineOptions: {
    chainWebpack,
    configureWebpack,
    devServer: {
      /* proxy: {
        "/customer": {
          target: "http://10.10.112.65:8080"
        }
      }, */
      before(app) {
        applyMock(app)
      }
    }
  },
  useBuiltIn: true
})
service.run('serve')
