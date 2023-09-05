import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { COOKEYS } from '$lib/helpers/cookie.helper';

export const load: LayoutServerLoad = ({ locals, url, cookies }) => {
	const key = cookies.get(COOKEYS.QRCODE_URL) ?? '';

	if (key) throw redirect(303, `/otp`);
	if (locals.user || locals.otpAuthenticated) throw redirect(303, `/`);

	const path = url.pathname;
	if (path === '/login') return { title: 'Login' };
	if (path === '/register') return { title: 'Register' };

	throw redirect(303, `/login`);
};
