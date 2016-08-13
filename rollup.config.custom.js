import { readFileSync } from 'fs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import Utils from './src/tool/utils.js';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/main.custom.js',
  plugins: [
      json(),
      babel(babelrc())
  ],
  banner: Utils.setBanner(pkg.version),
  external: external,
  targets: [
    {
      dest: 'custom/cordova.js',
      format: 'umd',
      moduleName: 'workplus',
      sourceMap: true
    },
    {
      dest: 'custom/cordova.es2015.js',
      format: 'es',
      sourceMap: true
    }
  ]
};
