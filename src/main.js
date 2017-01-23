import './scss/main.scss';

/// UTILS ///
import { $, $$ } from './client-utils';

/// STATE ///
import reducerConfig from './state-reducers/reducer-config';
const STORE = Redux.createStore(reducerConfig);

let socket = io('https://' + document.location.hostname + ':3000');

// VIEW COMPONENT ///
import './components/app.tag';
import './components/chat-room.tag';
import './components/username-field.tag';


riot.mount('*', {store: STORE, socket: socket});