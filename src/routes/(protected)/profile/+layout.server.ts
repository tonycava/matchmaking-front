import type { LayoutServerLoad } from './$types';
import UserService from '@services/user.service';
import { redirect } from '@sveltejs/kit';
import { COOKEYS } from '$lib/helpers/cookie.helper';

export const ssr = false;

export const load: LayoutServerLoad = async ({ cookies, locals, params }) => {
	const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) ?? '';
	const userId = params.userId ? params.userId : locals.user?.id ?? '';

	const response = await UserService.getUser(jwtToken, userId).catch(() => undefined);

	if (!response || !response.data.data) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		cookies.delete(COOKEYS.OTP_AUTHENTICATED);
		cookies.delete(COOKEYS.KEY);
		throw redirect(303, '/login');
	}

	const { user, chats } = response.data.data;

	return {
		user,
		chats
	};
};
