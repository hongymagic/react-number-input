var path    = require('path');
var webpack = require('webpack');

// currently, this is for bower
var config = {
	devtool: 'sourcemap',
	entry: {
		index: './src/react-number-input.js'
	},
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: 'build/',
		filename: 'react-number-input.js',
		sourceMapFilename: 'react-number-input.map',
		library: 'ReactNumberInput',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)/,
			loader: 'babel'
		}]
	},
	plugins: [],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	externals: {
		'react': {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		}
	},
};

module.exports = config;