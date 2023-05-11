import type { PageServerLoad } from './$types';
import { COOKEYS, defaultCookiesOptions } from '$lib/helpers/cookie.helper';
import { type Actions, redirect } from '@sveltejs/kit';
import QRCode from 'qrcode';
import { authenticator } from 'otplib';
import { INPUT } from '$lib/helpers/form.helper';

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		const form = await request.formData();
		const code = form.get(INPUT.CODE) as string;
		const secret = locals.user?.secret ?? '';
		if (authenticator.check(code, secret)) {
			cookies.set(COOKEYS.OTP_AUTHENTICATED, '1', defaultCookiesOptions);
			cookies.delete(COOKEYS.KEY);
			throw redirect(302, '/');
		}
		throw redirect(302, '/otp?error=invalid_code');
	}
};


export const load: PageServerLoad = async ({ cookies, locals, url: pageUrl }) => {
	const key = cookies.get(COOKEYS.KEY) ?? '';
	if (!key) throw redirect(303, '/login');
	if (locals.otpAuthenticated) throw redirect(303, '/');

	const url = await QRCode.toDataURL(key);
	return {
		url,
		error: pageUrl.searchParams.get('error')
	};
};