import type { PageServerLoad } from './$types';
import { type Action, type Actions, fail } from '@sveltejs/kit';
import { INPUT } from '$lib/utils';

export const load: PageServerLoad = async ({ request }) => {

	return {
		test: '1',
	};
};

const uploadProfilePicture: Action = async ({ request }) => {
	const form = await request.formData();
	const profilePicture = form.get(INPUT.PROFILE_PICTURE) as File;

	if (!profilePicture.size) return fail(400, { message: 'No profile picture provided' });

	const logoBuffer = await profilePicture?.arrayBuffer();
	const logoBase64 = Buffer.from(logoBuffer).toString('base64');
	console.log(logoBase64);

	return { message: 'success' };
};
export const actions: Actions = {
	uploadProfilePicture,
};