const path = require('path');
const config = require('./config');
require('ng-annotate-loader');
module.exports = {
  entry: {
    app: './themes/' + (config.theme || 'default') + '/app/index.js',
    admin: './public/admin/index.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  module: {
    //加载器配置
    loaders: [
      {test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel!ng-annotate?add=true'},
      {test: /\.css$/, loader: 'style!css!sass?sourceMap'},
      {test: /\.html$/, loader: 'ngtemplate?prefix=/static&relativeTo=' + path.resolve(__dirname) + '!html' },
      {test: /\.(png|jpg)$/, loader: 'url-loader'}
    ]
  }
};
