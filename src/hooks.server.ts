import type { Handle } from '@sveltejs/kit';
import { COOKEYS } from '$lib/utils';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const handle: Handle = async ({ resolve, event }) => {
	const jwtToken = event.cookies.get(COOKEYS.JWT_TOKEN);

	const payload = jwt.decode(jwtToken ?? '') as JwtPayload | null;
	if (!payload) return resolve(event);

	event.locals.user = {
		id: payload.id,
		username: payload.username,
		createdAt: payload.createdAt,
	};

	return resolve(event);
};