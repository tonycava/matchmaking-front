import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/$types';


export const load: PageServerLoad = ({ url, locals }) => {
	console.log("fesd")
	if ((url.pathname === '/register' || url.pathname === '/login') && locals.user) {
		throw redirect(303, `/`);
	}
};