import type { LayoutServerLoad } from './$types';
import { COOKEYS } from '$lib/utils';
import UserService from '@services/user.service';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, locals, params }) => {
	const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	const response = await UserService.getUser(jwtToken, params.userId ?? locals.user?.id ?? '')
		.catch(() => undefined);

	if (!response || !response.data.data) throw redirect(303, '/');

	return {
		user: response.data.data,
	};
};