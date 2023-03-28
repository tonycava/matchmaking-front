import io from 'socket.io-client';
import { getBaseURL } from '$lib/utils';

const ENDPOINT = getBaseURL() ?? 'http://localhost:3000';

const webSocketClient = io(ENDPOINT, {
	transports: ['polling'],
	withCredentials: true,
});
export default webSocketClient;