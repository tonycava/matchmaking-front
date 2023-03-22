import type { PageServerLoad } from './$types';
import { COOKEYS } from '$lib/utils';
import { getChat } from '@services/chat.service';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {

	const token = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	const response = await getChat(token).catch((error) => {
		console.error(error);
	});

	if (!response) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		throw redirect(303, '/login');
	}

	return {
		chats: response.data.data.messages
	};
};