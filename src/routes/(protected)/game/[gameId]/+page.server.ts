import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isValidUUID } from '$lib/utils';

export const load: PageServerLoad = ({ params }) => {
	const gameId = params.gameId;
	if (!isValidUUID(gameId)) throw redirect(303, '/');

	return {};
};
