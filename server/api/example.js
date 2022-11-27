function setUpApi(app) {
	app.get('/api/test', (req, res) => {
		res.send('test');
	});
}

module.exports = {
	setUpApi
};