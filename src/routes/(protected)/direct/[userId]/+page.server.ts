import type { PageServerLoad } from './$types';
import { COOKEYS } from '$lib/helpers/cookie.helper';
import DirectService from '@services/direct.service';
import { type Actions, redirect } from '@sveltejs/kit';
import { isValidUUID } from '$lib/utils';
import { INPUT } from '$lib/helpers/form.helper';
import socket from '$lib/socket';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) ?? '';
	const userIdToFetch = params.userId;

	if (!isValidUUID(userIdToFetch)) throw redirect(303, '/direct');

	const response = await DirectService.getDirectsChats(jwtToken, userIdToFetch).catch(
		() => undefined
	);

	if (!response) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		cookies.delete(COOKEYS.OTP_AUTHENTICATED);
		cookies.delete(COOKEYS.KEY);
		throw redirect(303, '/login');
	}

	return {
		data: response.data.data
	};
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const form = await request.formData();
		const message = form.get(INPUT.MESSAGE) as string;

		if (!message) return;

		socket.emit(`newDirectChat`, { message, to: params.userId, from: locals.user?.id });
	}
};
