let PlayerLocations = require('./player-locations');
let playerNames = {};

module.exports = {
	init(io) {
		PlayerLocations.reset();

		io.on('connection', function (socket) {
			console.log(`Got a new connection`);

			socket.on('nameChange', function (data) {
				console.log(`Connection [${socket.id}] wishes to be known as: ${data.name}`);
				socket.chosenName = data.name;
				playerNames[socket.id] = socket.chosenName;
			});

			socket.on('currentPosition', function (data) {
				console.log(`Seeing position as: ${data.lat}, ${data.lon}`);
				PlayerLocations.updatePlayer(socket.id, { lat: data.lat, lon: data.lon });
				let nearbyPlayers = PlayerLocations.getNearby(socket.id, 5);
				let result = nearbyPlayers.map(p => { return { name: playerNames[p.name], position: p.position } });
				if (nearbyPlayers.length > 0) {
					socket.emit('nearby', nearbyPlayers);
				}
			});

			socket.on('look', function (data, fn) {
				let nearbyPlayers = PlayerLocations.getNearby(socket.id, 5);
				let result = nearbyPlayers.map(p => { return { name: playerNames[p.name], position: p.position } });
				fn(result);
			});

			socket.on('disconnect', function() {
				console.log(`Player [${socket.id}] disconnected...`);
				PlayerLocations.removePlayer(socket.id);
			});
		});
	}
}