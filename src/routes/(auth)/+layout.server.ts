import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, url, cookies }) => {
	const path = url.pathname;
	const key = cookies.get('key') ?? '';

	if (key) throw redirect(303, `/otp`);
	if (locals.user || locals.otpAuthenticated) throw redirect(303, `/`);

	if (path === '/login') return { title: 'Login' };
	if (path === '/register') return { title: 'Register' };

	throw redirect(303, `/login`);
};
