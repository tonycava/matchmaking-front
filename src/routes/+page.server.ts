import type { PageServerLoad } from './$types';
import { COOKEYS, WEB_SOCKET_EVENT } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import ChatService from '@services/chat.service';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	if (!locals.user) throw redirect(303, '/login');

	const token = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	const response = await ChatService.getChats(token, { start: 0, end: 11 })
		.catch(() => undefined);

	if (!response) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		throw redirect(303, '/login');
	}

	return {
		chats: response.data.data.messages,
	};
};