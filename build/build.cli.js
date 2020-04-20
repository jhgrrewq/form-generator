const build = require('./build.js')
const path = require('path')
const pkg = {
  name: ':::build:::',
  version: '1.0.0'
}
var args = process.argv.slice(2)
var USAGE = 'Usage:\n' +
            '  ' + pkg.name + '\n' +
            '  ' + pkg.name + ' --outputDir="path/to/outputDir"\n' +
            '  ' + pkg.name + ' --entry="path/to/entry/file"\n' +
            '  ' + pkg.name + ' --name="lib name"\n' +
            '  ' + pkg.name + ' --formats="formats" umd cjs...\n'

function isArg(arg) {
  return args.some(function(str) {
    return str === arg || str.indexOf(arg + '=') === 0
  })
}
function resolve(filePath, context = process.cwd()) {
  return filePath[0] !== '/' ? path.resolve(context, filePath) : filePath
}
function log(msg) {
  process.stdout.write(pkg.name + ': ' + msg + '\n')
}
function error(msg) {
  process.stderr.write(pkg.name + ': ' + msg + '\n')
  process.exit(1)
}

if (isArg('--help') || isArg('-h')) {
  process.stdout.write(pkg.description + '.\n\n' + USAGE + '\n')
} else if (isArg('--version') || isArg('-v')) {
  process.stdout.write(pkg.name + ' ' + pkg.version + '\n')
} else {
  const opts = { }
  const cwd = process.cwd()
  for (let i = 0; i < args.length; i++) {
    if (args[i][0] !== '-') {
      continue
    }

    const arg = args[i].split('=')
    const name = arg[0]
    const value = arg[1] && arg[1].replace(/^["']|["']$/g, '')
    if (name === '--outputDir' || name === '-o') {
      opts.outputDir = resolve(value, cwd)
    } else if (name === '--entry' || name === '-e') {
      opts.entry = resolve(value, cwd)
    } else if (name === '--name' || name === '-n') {
      opts.name = value
    } else if (name === '--formats' || name === '-f') {
      opts.formats = value
    }
    if (!opts.hasOwnProperty('formats')) {
      opts.formats = 'umd-min'
    }
  }
  if (Object.keys(opts).length < 4) {
    error('Unknown arguments.\n\n' + USAGE)
  } else {
    log('entry => ' + opts.entry)
    build(opts)
  }
}
