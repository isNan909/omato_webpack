var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require("path")

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
  },
  output: {
    path: __dirname + '/dist',
    filename:  '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      }
    ]
  },
  devServer: {
    compress: true,
    port: 9000,
    hot :true,
    stats: "errors-only"
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My project name',
      minify: {
        collapseWhitespace: true
      },
      hash : true,
      excludeChunks: ['contact'],
      filename: 'index.html',
      template: './src/index.pug', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      minify: {
        collapseWhitespace: true
      },
      hash : true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/contact.pug', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new ExtractTextPlugin ({
      filename: 'app.css',
      disable: true,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
