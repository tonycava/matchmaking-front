import type { Action, Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { COOKEYS, defaultCookiesOptions, INPUT } from '$lib/utils';
import AuthService from '@services/auth.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(303, `/`);
};

const register: Action = async ({ request, cookies }) => {
	const form = await request.formData();
	const username = form.get(INPUT.USERNAME) as string;
	const password = form.get(INPUT.PASSWORD) as string;

	const response = await AuthService.register(username, password)
		.catch(e => ({ message: e.data?.message || 'Internal server error' }));

	if ('message' in response) {
		return fail(303, { internalError: response?.message || 'Internal server error' });
	}

	cookies.set(COOKEYS.JWT_TOKEN, response.data.data.token, defaultCookiesOptions);

	throw redirect(303, `/`);
};

export const actions: Actions = {
	register,
};