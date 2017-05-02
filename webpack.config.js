var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'app');

module.exports = [
  {
    entry: APP_DIR + '/client/views/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    },
  },
  {
    entry: APP_DIR + '/client/styles/main.scss',
    output: {
      path: BUILD_DIR,
      filename: '/css/main.js'
    },
    resolve: {
      extensions: ['', '.scss']
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style", "css!sass")
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("/css/main.css")
    ]
  }
];
