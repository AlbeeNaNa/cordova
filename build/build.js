let fs = require('fs');
let zlib = require('zlib')
let rollup = require('rollup');
let babel = require('rollup-plugin-babel');
let babelrc = require('babelrc-rollup');
let json = require('rollup-plugin-json');
let uglify = require('rollup-plugin-uglify');
let { minify } = require('uglify-js');

let pkg = require('../package.json');
let banner =
  '/*!\n' +
  ' * Cordova.js v' + pkg.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Hejx\n' +
  ' * Released under the MIT License.\n' +
	' * ' + pkg.homepage + '\n' +
  ' */\n';

// CommonJS build.
// this is used as the "main" field in package.json
// and used by bundlers like Webpack and Browserify.
rollup.rollup({
  entry: 'src/main.js',
  plugins: [
    json(),
    babel({
      loose: 'all'
    })
  ]
})
.then(function (bundle) {
  return write('lib/cordova.common.js', bundle.generate({
    format: 'cjs',
    banner: banner
  }).code)
})
// Standalone Dev Build
.then(function () {
  return rollup.rollup({
    entry: 'src/main.js',
    plugins: [
      json(),
      babel({
        loose: 'all'
      })
    ]
  })
  .then(function (bundle) {
    return write('lib/cordova.js', bundle.generate({
      format: 'umd',
      banner: banner,
      moduleName: 'workplus' // Prevent naming conflicts
    }).code)
  })
})
.then(function () {
  // Standalone Production Build
  return rollup.rollup({
    entry: 'src/main.js',
    plugins: [
      json(),
      babel({
        loose: 'all'
      }),
      uglify({
					output: {
  	        preamble: banner,
  	        ascii_only: true
	      }
			}, minify)
    ]
  })
  .then(function (bundle) {
    return write('lib/cordova.min.js', bundle.generate({
      format: 'umd',
      banner: banner,
      moduleName: 'workplus' // Prevent naming conflicts
    }).code)
  })
  .then(zip)
})
.catch(logError)

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

function zip () {
  return new Promise(function (resolve, reject) {
    fs.readFile('lib/cordova.min.js', function (err, buf) {
      if (err) return reject(err)
      zlib.gzip(buf, function (err, buf) {
        if (err) return reject(err)
        write('lib/cordova.min.js.gz', buf).then(resolve)
      })
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
