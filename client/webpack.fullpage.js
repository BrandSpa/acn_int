"use strict";
const webpack = require("webpack");
const fs = require("fs");
const Path = require("path");
const WebpackCleanupPlugin =  require("webpack-cleanup-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    vendor: [
      "jquery",
      "mitt",
			"fullpage.js",
			"lazysizes",
      "airbnb-browser-shims"
    ],
  	app_me: "./fullpage/index.js"
  },
  output: {
  	path: Path.join(__dirname, "/dist/"),
    filename: "[name].js"
  },
  module: {
  	loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader?cacheDirectory=true"
			}
		]
  },
	plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "vendor_me.js",
        minChunks: Infinity
      })
    ]
};
