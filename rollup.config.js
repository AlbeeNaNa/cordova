import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';


let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let banner =
  '/*!\n' +
  ' * Cordova.js v' + pkg.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Hejx\n' +
  ' * Released under the MIT License.\n' +
	' * ' + pkg.homepage + '\n' +
  ' */\n';

export default {
  entry: 'src/main.js',
  plugins: [
      json(),
      babel(babelrc()),
			uglify({
					output: {
	        preamble: banner,
	        ascii_only: true
	      }
			}, minify)
  ],
  banner: banner,
  external: external,
  targets: [
    {
      dest: pkg['main'],
      format: 'umd',
      moduleName: 'workplus'
    },
    {
      dest: 'lib/cordova.cjs.js',
      format: 'cjs'
    }
  ]
};
