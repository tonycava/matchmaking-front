import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) throw redirect(303, `/`);
};