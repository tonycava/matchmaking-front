import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = ({ locals, url }) => {
	if (locals.user) throw redirect(303, `/`);

	const path = url.pathname;

	if (path === '/login') return { title: 'Login' };
	if (path === '/register') return { title: 'Register' };

	throw redirect(303, `/login`);
};