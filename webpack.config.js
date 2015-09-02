var webpack = require('webpack');
var loaders = ['babel'];
var path = require('path');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		'./demo.jsx' // Your appʼs entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loaders: ['react-hot', 'babel'],
		}]
	},
	devServer: {
		contentBase: "./public",
		noInfo: true, //  --no-info option
		hot: true,
		inline: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};