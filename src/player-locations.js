let GeoDistance = require('./geo-distance');

let players = [];

module.exports = { reset, updatePlayer, getNearby, removePlayer };

function removePlayer(id) {
	console.log(`Preparing to remove a player, currently ${players.length} players in game.`);
	players = players.filter( p => p.name !== id);
	console.log(`Now - ${players.length} players in game.`);
}

function reset() {
	console.log('Resetting players!');
	players = [];
}

function updatePlayer(name, position) {
	console.log(`Updating player [${name}]`);
	let foundPlayers = players.filter(player => player.name === name);
	console.log(`Found ${foundPlayers.length} players with that name/id`);

	if (foundPlayers.length > 0) {
		foundPlayers[0].position = position;
	} else {
		players.push({
			name: name,
			position: position
		});
	}
}

function getNearby(id, radius) {
	let target = players.find(player => {
		console.log(`Checking to see if ${player.name} is equal to ${id}`);
		return player.name === id;
	});

	if (!target) {
		console.log('Target player not found to check nearby!');
		return [];
	}

	let otherPlayers = players.filter(p => p.name !== id);
	console.log(`There are ${otherPlayers.length} other players to check.`);

	let nearbyPlayers = otherPlayers.filter(op => {
		return 5 >= GeoDistance.distance(op.position.lat, op.position.lon, target.position.lat, target.position.lon);
	});

	console.log(`Found ${nearbyPlayers.length} nearby.`);
	return nearbyPlayers;
}