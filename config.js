/**
 * Build and run config
 */
const path = require('path');

module.exports = {
	baseDir: __dirname,
	modulesDir: path.join(__dirname, 'src', 'modules'),
	appTitle: 'My app',
	port: 3000
};
