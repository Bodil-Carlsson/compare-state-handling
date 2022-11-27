const fs = require('fs');
const path = require('path');
const config = require('../config');

const moduleDirs = fs.readdirSync(config.modulesDir);
const modules = new Map(moduleDirs.map((moduleName) =>
  [moduleName, require(path.join(config.modulesDir, moduleName, 'index'))]
));

const serverRoutes = [];

modules.forEach((moduleIndex, moduleName) => {
	[{ pattern: '' }, ...moduleIndex.routes].forEach((route) => {
		const pattern = `/${moduleName}${route.pattern}`;
		const {
			title, 
			action, 
			clientIndex, 
			stylesIndex
		} = {
			...moduleIndex,
			...route
		};

		const actionString = action.toString();
    const functionIndex = actionString.indexOf('(');

		const serverRoute = `{
			moduleName: '${moduleName}',
			title: '${title}',
			pattern: '${pattern}',
			clientIndex: '${clientIndex || ''}',
			stylesIndex: '${stylesIndex || ''}',
			action${actionString.substring(functionIndex)}
		}`;

		serverRoutes.push(serverRoute);
	});
});

const serverRoutesScript = `module.exports = {
	routes: [
		${serverRoutes.join(', \n    ')}
	]
}`;

if (!fs.existsSync('generated')) {
	fs.mkdirSync('generated');
}
fs.writeFileSync('generated/server-routes.js', serverRoutesScript);
