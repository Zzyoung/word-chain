var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          sourceMap: true,
          presets: ['es2015']
        }
      }]
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')({})
            ];
          }
        }
      }]
    }, {
      test: /\.less/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('autoprefixer')({})
            ];
          }
        }
      }, {
        loader: 'less-loader'
      }]
    },{
      test: /\.html/,
      loader: 'html-loader'
    }, {
      test: /\.tpl/,
      use: [{
        loader: 'ejs-loader'
      }]
    }, {
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: '2000',
          name: 'assets/[name]-[hash:5].[ext]'
        }
      }, {
        loader: 'image-webpack-loader'
      }]
    }]
  },
  plugins: [
    new htmlWebpackPlugin({
      'template': 'index.html',
      'inject': 'head',
      'minify': {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
}