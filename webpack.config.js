require('ng-annotate-loader');

module.exports = {
  entry: {
    test: './public/test/index.js',
    app: './public/app.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  module: {
    //加载器配置
    loaders: [
      // {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel!ng-annotate?add=true'},
      // {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      // {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  }
};
