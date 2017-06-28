const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new webpack.DefinePlugin({
			API_PATH: JSON.stringify('http://jsonplaceholder.typicode.com')
		})
	],
	module: {
		loaders: [
			// Javascript
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loaders: ['babel']
			},
			// Stylesheets
			{
				test: /\.scss$/,
				loaders: [
					'style-loader', // creates style nodes from JS strings
					'css-loader', // translates CSS into CommonJS
					'sass-loader' // compiles Sass to CSS
				]
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader', // creates style nodes from JS strings
					'css-loader', // translates CSS into CommonJS
				]
			},
			{
				test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
				loaders: ['url-loader?limit=8192']
			}
		]
	}
};
