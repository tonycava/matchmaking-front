import type { PageServerLoad } from './$types';
import { COOKEYS, defaultCookiesOptions } from '$lib/helpers/cookie.helper';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { INPUT } from '$lib/helpers/form.helper';
import AuthService from '@services/auth.service';
import axios from 'axios';
import { getBaseURL } from '$lib/utils';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const code = form.get(INPUT.CODE) as string;
		const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) as string;
		const response = await AuthService.verifyOTP(code, jwtToken)
			.catch((e) => {
				return { internalError: e.response.data.message };
			});

		if ('internalError' in response) {
			return fail(400, {
				internalError: response.internalError
			});
		}

		cookies.delete(COOKEYS.QRCODE_URL);
		cookies.set(COOKEYS.JWT_TOKEN, response.data.data.token, defaultCookiesOptions);
		throw redirect(303, '/');
	}
};


export const load: PageServerLoad = async ({ cookies, locals }) => {
	const response = await axios.get(`${getBaseURL()}/auth/generator/qr-code`, {
		headers: { Authorization: cookies.get(COOKEYS.JWT_TOKEN) }
	}).catch((e) => undefined);

	if (!response) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		throw redirect(303, '/login');
	}

	if (locals.otpAuthenticated) throw redirect(303, '/');

	return {
		qrCodeURL: response.data.data.qrCodeURL
	};
};