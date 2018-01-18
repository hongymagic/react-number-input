var path = require('path')
var libraryName = require('./package.json').name
var outputFile = libraryName + '.js'

module.exports = {
  devtool: 'eval-source-map',
  entry: [path.join(__dirname, 'src/' + outputFile)],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  }
}