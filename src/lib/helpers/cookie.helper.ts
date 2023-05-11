import type { CookieSerializeOptions } from 'cookie';

export enum COOKEYS {
	JWT_TOKEN = 'jwt_token',
	KEY = "key",
	OTP_AUTHENTICATED = 'otp_auth',
}

export const defaultCookiesOptions: CookieSerializeOptions = {
	path: '/',
	httpOnly: false,
	// sameSite: 'strict',
	secure: process.env.NODE_ENV === 'production',
	maxAge: 60 * 60 * 24 * 3
};
