import type { PageServerLoad } from './$types';
import { COOKEYS } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import ChatService from '@services/chat.service';
import LeaderboardService from '@services/leaderboard.service';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	if (!locals.user) throw redirect(303, '/login');

	const token = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	const responseChats = await ChatService.getChats(token, { start: 0, end: 11 })
		.catch(() => undefined);

	const responseLeaderboard = await LeaderboardService.getLeaderboard(token)
		.catch(() => undefined);

	if (!responseChats || !responseLeaderboard) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		throw redirect(303, '/login');
	}

	return {
		chats: responseChats.data.data.messages,
		leaderboard: responseLeaderboard.data.data.winners,
	};
};