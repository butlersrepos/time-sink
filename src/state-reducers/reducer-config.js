import surroundingsReducer from './surroundings-reducer';

export default function reducersConfig(state = {}, action) {
	console.log(`In your reducer dawg! Action: ${action.type}`);
	switch (action.type) {
		case 'surroundings':
			return surroundingsReducer(state, action.data);
	}
};