var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      'template': 'index.html',
      'inject': 'head',
      'title': '单词接龙'
    })
  ]
}