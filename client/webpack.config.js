'use strict';
const webpack = require('webpack');
const fs = require('fs');
const Path = require('path');
const WebpackCleanupPlugin =  require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: false
});


const changeFilesNames = function() {
  this.plugin("done", function(statsData) {
    const stats = statsData.toJson();

    if (!stats.errors.length) {
      const dir = __dirname;
      const footerFile = Path.join(dir, "footer.php").replace('client/', '');
      const headerFile = Path.join(dir, "header.php").replace('client/', '');

      const footerDonateFile = Path.join(dir, "footer-donate.php").replace('client/', '');
      const headerDonateFile = Path.join(dir, "header-donate.php").replace('client/', '');
      
      const headerFullpageFile = Path.join(dir, "header-fullpage.php").replace('client/', '');
      const footerFullpageFile = Path.join(dir, "footer-fullpage.php").replace('client/', '');

      const appName = stats.chunks[0].files[0];
      const appCss = stats.chunks[0].files[1];
      const vendorName = stats.chunks[1].files[0];

      const files = [
        footerFile,
        headerFile,
        footerDonateFile, 
        headerDonateFile,
        footerFullpageFile,
        headerFullpageFile
      ];

      files.forEach(file => {
        let fileHtml = fs.readFileSync(file, "utf8");
        let fileHtmlOutput = fileHtml.replace(/app.*\.js/, appName);
        fileHtmlOutput = fileHtmlOutput.replace(/vendor.*\.js/, vendorName);
        fileHtmlOutput = fileHtmlOutput.replace(/app.*\.css/, appCss);
        fs.writeFileSync(file, fileHtmlOutput);
      });

    }
  });
};

module.exports = {
  entry: {
    vendor: [
      'babel-polyfill',
      'react', 
      'react-dom', 
      'axios', 
      'qs',
      'webfontloader', 
      'react-multiple-render'
    ],
  	app: './app.js'
  },
  output: {
  	path: Path.join(__dirname, '/public/js'),
    filename: '[name].[chunkhash].js'
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
           // use style-loader in development
          fallback: "style-loader"
        })
      }
		]
  },
	plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[chunkhash].js', 
        minChunks: 2
      }),
      changeFilesNames,
       extractSass,
      new WebpackCleanupPlugin({
        exclude: ["admin.js"],
      })
    ]
};