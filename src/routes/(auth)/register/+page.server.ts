import type { Action, Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import AuthService from '@services/auth.service';
import { INPUT } from '$lib/helpers/form.helper';
import { COOKEYS, defaultCookiesOptions } from '$lib/helpers/cookie.helper';

const register: Action = async ({ request, cookies }) => {
	const form = await request.formData();
	const username = form.get(INPUT.USERNAME) as string;
	const password = form.get(INPUT.PASSWORD) as string;

	const response = await AuthService.register(username, password).catch((e) => {
		return { message: e.response?.data?.message || 'Internal server error' };
	});

	if ('message' in response) {
		const errors = response.message.split(';');
		return fail(303, { internalError: errors?.at(0) || 'Internal server error' });
	}

	cookies.set(COOKEYS.JWT_TOKEN, response.data.data.token, defaultCookiesOptions);
	cookies.set(COOKEYS.KEY, response.data.data.authKey, defaultCookiesOptions);
	cookies.set(COOKEYS.OTP_AUTHENTICATED, '0', defaultCookiesOptions);

	throw redirect(303, `/otp`);
};

export const actions: Actions = {
	register
};
