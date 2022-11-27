const http = require('http');
const { Server } = require("socket.io");

function createSocket(app) {
	const server = http.createServer(app);
	const io = new Server(server, { serveClient: false });

	io.on('connection', (socket) => {
		const interval = setInterval(() => {
			socket.emit('exampleEvent');
		}, 3000);

		socket.on('disconnect', () => {
			clearInterval(interval);
		});
	});

	return server;
}

module.exports = {
	createSocket
};
