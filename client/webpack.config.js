const webpack = require('webpack');
const fs = require('fs');
const Path = require('path');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const extractSass = new ExtractTextPlugin({
//   filename: "[name].css",
//   disable: false
// });

module.exports = {
  entry: {
    vendor: [
      'core-js',
      'react',
      'react-dom',
      'axios',
      'qs',
      'webfontloader',
      'react-multiple-render',
      'minigrid',
      'card-validator',
      'lazysizes',
      'lazysizes/plugins/bgset/ls.bgset.min.js',
    ],
  	app: './app.js',
  },
  output: {
  	path: Path.join(__dirname, '/dist/'),
    filename: '[name].js',
  },
  module: {
  	loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader?cacheDirectory=true',
    },
  ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: 2,
    }),
  ],
};
