import type { LayoutServerLoad } from './$types';
import { COOKEYS } from '$lib/helpers/cookie.helper';
import DirectService from '@services/direct.service';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	const response = await DirectService.getDirectsConversations(jwtToken).catch(() => undefined);

	if (!response) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		cookies.delete(COOKEYS.OTP_AUTHENTICATED);
		cookies.delete(COOKEYS.KEY);
		throw redirect(303, '/login');
	}
	return {
		conversations: response.data.data
	};
};
