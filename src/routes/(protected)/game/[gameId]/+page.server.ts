import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const gameId = params.gameId;
	const isValidUUID = z.string().uuid().safeParse(gameId);
	if (!isValidUUID) throw redirect(303, '/');

	return {};
};