import type { PageServerLoad } from './$types';
import { COOKEYS, INPUT, WEB_SOCKET_EVENT } from '$lib/utils';
import { type Actions, redirect } from '@sveltejs/kit';
import ChatService from '@services/chat.service';
import LeaderboardService from '@services/leaderboard.service';
import socket from '$lib/webSocketClient';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	if (!locals.user) throw redirect(303, '/login');

	const token = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	const responseChats = await ChatService.getChats(token, { start: 0, end: 11 }).catch(
		() => undefined
	);

	const responseLeaderboard = await LeaderboardService.getLeaderboard(token).catch(() => undefined);

	if (!responseChats || !responseLeaderboard) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		throw redirect(303, '/login');
	}

	return {
		chats: responseChats.data.data.messages,
		leaderboard: responseLeaderboard.data.data.winners
	};
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await request.formData();
		const message = form.get(INPUT.MESSAGE) as string;

		if (!message) return;

		socket.emit(WEB_SOCKET_EVENT.CHAT, { userId: locals.user?.id, message });

		return { success: true };
	}
};
