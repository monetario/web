
var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');

var config = {
  cache: true,
  debug: true,
  //devtool: 'source-map',

  entry: {
    index: path.resolve(__dirname, 'js/index.js'),
    vendors: [
      'react', 'react-dom', 'reflux', 'react-router', 'async', 'axios', 'lodash', 'moment',
      'js-cookie', 'history', 'classnames', 'react-select', 'react-datetime', 'formsy-react'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'static/js/dist/'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      //exclude: [node_modules_dir],
      loader: 'babel' // The module to load. "babel" is short for "babel-loader"
    }]
  }
};

module.exports = config;
