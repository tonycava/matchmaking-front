import type { CookieSerializeOptions } from 'cookie';

export enum COOKEYS {
	JWT_TOKEN = 'jwt_token',
	QRCODE_URL = "qrcode_url",
}

export const defaultCookiesOptions: CookieSerializeOptions = {
	path: '/',
	httpOnly: false,
	secure: process.env.NODE_ENV === 'production',
	maxAge: 60 * 60 * 24 * 3
};
