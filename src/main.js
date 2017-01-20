/// UTILS ///
import { $, $$ } from './client-utils';

/// STATE ///
import reducerConfig from './state-reducers/reducer-config';
const STORE = Redux.createStore(reducerConfig);

// VIEW COMPONENT ///
import './components/app.tag';
riot.mount('*', {store: STORE});

$('.connect').addEventListener('click', function () {
	let chosenName = document.querySelector('.connection-name').value;
	if (!chosenName || chosenName.length < 1) return;
	socket.emit('nameChange', { name: chosenName });
});

$('.look-around').addEventListener('click', function () {
	$('.surroundings').classList.add('updating');
	socket.emit('look', null, nearbyPlayers => {
		setTimeout(() => {
			STORE.dispatch({
				type: 'surroundings',
				data: nearbyPlayers
			});
			$('.surroundings').classList.remove('updating');
		}, 500);
	});
});

// SOCKET STUFF //

let socket = io('https://' + document.location.hostname + ':3000');
socket.on('nearby', function (nearbyPlayers) {
	console.log(`You have ${nearbyPlayers.length} players near you!`);
});

updatePosition();
function updatePosition() {
	navigator.geolocation.getCurrentPosition(position => {
		let data = {
			lat: position.coords.latitude,
			lon: position.coords.longitude
		};
		socket.emit('currentPosition', data);
	});
}