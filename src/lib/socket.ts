import io from 'socket.io-client';
import { getBaseURL } from '$lib/utils';

export enum WEB_SOCKET_EVENT {
	CONNECT = 'connect',
	LEAVE_WAITING = 'leaveWaiting',
	JOIN_GAME = 'joinGame',
	PLAY = 'play',
	UPDATE = 'update',
	JOIN_WAITING = 'joinWaiting',
	CHAT = 'chat',
	NEW_MESSAGE = 'newMessage',
	PARTNER = 'partner'
}

const ENDPOINT = getBaseURL() ?? 'http://localhost:3000';

const webSocketClient = io(ENDPOINT, {
	path: '/socket.io',
	transports: ['polling'],
	secure: true
});
export default webSocketClient;
