const { generateNumbers } = require('../utils/random-numbers');

function setUpApi(app) {
	app.get('/api/user/rows', (req, res) => {
		const rows = [1, 2, 3, 4, 5]
			.map((id) => ({ 
				id, 
				numbers: generateNumbers().map((value) => ({ value }))
			}));

		res.send({ rows });
	});
}

module.exports = {
	setUpApi
};