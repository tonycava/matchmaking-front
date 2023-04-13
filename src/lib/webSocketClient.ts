import io from 'socket.io-client';
import { getBaseURL } from '$lib/utils';

const ENDPOINT = getBaseURL() ?? 'http://localhost:3000';

const webSocketClient = io(ENDPOINT, {
	path: '/socket.io',
	transports: ['websocket', 'polling']
});
export default webSocketClient;
