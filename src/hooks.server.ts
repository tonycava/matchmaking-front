import type { Handle } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { COOKEYS } from '$lib/helpers/cookie.helper';

export const handle: Handle = async ({ resolve, event }) => {
	const jwtToken = event.cookies.get(COOKEYS.JWT_TOKEN);

	const payload = jwt.decode(jwtToken ?? '') as JwtPayload | null;
	if (!payload) return resolve(event);

	event.locals.user = {
		id: payload.id,
		username: payload.username,
		createdAt: payload.createdAt,
		role: payload.role,
		secret: payload.secret
	};
	event.locals.otpAuthenticated = event.cookies.get(COOKEYS.OTP_AUTHENTICATED) === '1';
	return resolve(event);
};
