import type { CookieSerializeOptions } from 'cookie';
import { browser } from '$app/environment';

export enum INPUT {
	USERNAME = 'username',
	PASSWORD = 'password',
}

export const getBaseURL = () => browser ? import.meta.env.VITE_EXTERNAL_API_URL : import.meta.env.VITE_API_URL;

export enum WEB_SOCKET_EVENT {
	CONNECT = 'connect',
	LEAVE_WAITING = 'leaveWaiting',
	JOIN_GAME = 'joinGame',
	PLAY = 'play',
	UPDATE = 'update',
	JOIN_WAITING = 'joinWaiting',
	CHAT = 'chat',
	NEW_MESSAGE = 'newMessage',
	PARTNER = 'partner',
}

export enum COOKEYS {
	JWT_TOKEN = 'jwt_token',
}

export const defaultCookiesOptions: CookieSerializeOptions = {
	path: '/',
	httpOnly: false,
	sameSite: 'strict',
	secure: process.env.NODE_ENV === 'production',
	maxAge: 60 * 60 * 24 * 3
};
