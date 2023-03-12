module.exports = {
	title: 'redux',
	action(req, res, next) { res.render('index'); },
	clientIndex: 'app.jsx',
	stylesIndex: 'style.less',
	routes: [
		{
			title: 'redux numbers',
			pattern: '/numbers'
		}
	]
};
