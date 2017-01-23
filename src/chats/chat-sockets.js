module.exports = {
	attachSockets
};

function attachSockets(io) {
	io.on('connection', function(socket) {
		console.log('New connection incoming!');
	});
}