import type { Action, Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import AuthService from '@services/auth.service';
import { INPUT } from '$lib/helpers/form.helper';
import { COOKEYS, defaultCookiesOptions } from '$lib/helpers/cookie.helper';

const login: Action = async ({ request, cookies }) => {
	const form = await request.formData();
	const username = form.get(INPUT.USERNAME) as string;
	const password = form.get(INPUT.PASSWORD) as string;

	const response = await AuthService.login(username, password).catch((e) => ({
		message: e.response?.data?.message || 'Internal server error'
	}));

	if ('message' in response) {
		const errors = response.message.split(';');
		return fail(303, { internalError: errors?.at(0) || 'Internal server error' });
	}

	console.log(response.data.data.qrCodeURL)
	console.log(response.data.data.token)

	cookies.set(COOKEYS.JWT_TOKEN, response.data.data.token);
	cookies.set(COOKEYS.QRCODE_URL, response.data.data.qrCodeURL);

	throw redirect(303, `/otp`);
};

export const actions: Actions = {
	login
};
