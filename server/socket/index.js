const http = require('http');
const { Server } = require("socket.io");
const { generateNumbers } = require('../utils/random-numbers');

function createSocket(app) {
	const server = http.createServer(app);
	const io = new Server(server, { serveClient: false });

	io.on('connection', (socket) => {
		let numbers;
		const interval = setInterval(() => {
			if (!numbers) {
				numbers = generateNumbers();
				socket.emit('numbers:start');
			}
			socket.emit('numbers:number', { number: numbers.shift() });
			if (!numbers.length) {
				clearInterval(interval);
				socket.emit('numbers:done');
			}
		}, 5000);

		socket.on('disconnect', () => {
			clearInterval(interval);
		});
	});

	return server;
}

module.exports = {
	createSocket
};
