var webpack = require('webpack');

let config = {
    context: './demo',
    entry: "./entry.js",
    output: {
        filename: 'bundle.js'
    }
}

module.exports = config;
