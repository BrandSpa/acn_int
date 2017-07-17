'use strict';
const webpack = require("webpack");
const fs = require("fs");
const Path = require("path");
const WebpackCleanupPlugin =  require("webpack-cleanup-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: false
});

module.exports = {
  entry: {
    vendor: [
      "babel-polyfill",
      "react",
      "react-dom",
      "axios",
      "qs",
      "webfontloader",
      "react-multiple-render",
      "lazysizes",
      "lazysizes/plugins/bgset/ls.bgset.min.js"
    ],
  	app: "./app.js"
  },
  output: {
  	path: Path.join(__dirname, '/dist/'),
    filename: '[name].js'
  },
  module: {
  	loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader?cacheDirectory=true'
			},
       {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      }
		]
  },
	plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: 2
      }),
      extractSass
    ]
};
