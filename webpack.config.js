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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use:
        [
          'file-loader?name=images/[name].[ext]' //image-webpack-loader needs to be added
        ]
      }
    ]
  },
  devServer: {
    compress: true,
    port: 9000,
    hot : false,
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
      disable: false,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
