var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/dist',
    filename:  'app.bundle.js'
  },
  module: {
    rules: [
      {test: /\.scss$/, loaders: ['style-loader','css-loader','sass-loader']}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My project name',
      minify: {
        collapseWhitespace: true
      },
      hash : true,
      template: './src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
    })
  ]
}
