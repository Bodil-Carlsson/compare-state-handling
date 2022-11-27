const path = require('path');
const { routes } = require('./generated/server-routes');
const config = require('./config');

const entries = {};
routes.forEach((route) => {
	if (route.clientIndex) entries[`${route.moduleName}-${route.clientIndex.replace('jsx', 'js')}`] = [path.join(config.modulesDir, route.moduleName, route.clientIndex)];
	if (route.stylesIndex) entries[`${route.moduleName}-${route.stylesIndex.replace('less', 'js')}`] = [path.join(config.modulesDir, route.moduleName, route.stylesIndex)];
});

module.exports = {
  mode: 'development',
  entry: entries,
  devtool: 'inline-source-map',
	resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    filename: '[name]',
    path: path.join(__dirname, 'public'),
    publicPath: '/'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
			{
				test: /\.(js|jsx)$/i,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: { presets: ["@babel/env"] }
			},
			{
				test: /\.less$/i,
				use: [
					"style-loader",
					"css-loader",
					"less-loader",
				],
			}
		]
  }
};