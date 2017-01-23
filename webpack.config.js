var webpack = require('webpack');

module.exports = {
	entry: [
		'./src/main.js'
	],
	output: {
		filename: 'bundle.js',
		path: __dirname + '/public/javascripts'
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.ProvidePlugin({
			riot: 'riot'
		})
	],
	module: {
		preLoaders: [
			{ test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
		],
		loaders: [{
			test: /\.js$|\.tag$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['es2015']
			}
		}, {
			test: /\.scss$/,
			loaders: ["style-loader", "css-loader", "sass-loader"]
		}]
	}
};