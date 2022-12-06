const { generateNumbers } = require('../utils/random-numbers');

function setUpApi(app) {
	app.get('/api/user/rows', (req, res) => {
		const rows = [0, 1, 2, 3, 4]
			.map((id) => ({ 
				id, 
				numbers: generateNumbers().map((value) => ({ value }))
			}));

			setTimeout(() => {
				res.send({ rows });
			}, 2500);
	});
}

module.exports = {
	setUpApi
};