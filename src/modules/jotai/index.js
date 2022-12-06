module.exports = {
	title: 'base',
	action(req, res, next) { res.render('index'); },
	clientIndex: 'app.jsx',
	stylesIndex: 'style.less',
	routes: [
		{
			title: 'base numbers',
			pattern: '/numbers'
		}
	]
};
