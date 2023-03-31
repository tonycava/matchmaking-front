import type { PageServerLoad } from './$types';
import { type Action, type Actions, fail, redirect } from '@sveltejs/kit';
import { COOKEYS, INPUT } from '$lib/utils';
import UserService from '@services/user.service';

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	const response = await UserService.getUser(jwtToken, locals.user?.id ?? '')
		.catch(() => undefined);

	if (!response || !response.data.data) throw redirect(303, '/');

	return {
		profilePicture: response.data.data.profilePicture,
	};
};

const uploadProfilePicture: Action = async ({ request, cookies, locals }) => {
	const form = await request.formData();
	const profilePicture = form.get(INPUT.PROFILE_PICTURE) as File;

	const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	if (!profilePicture.size) return fail(400, { message: 'No profile picture provided' });

	const logoBuffer = await profilePicture?.arrayBuffer();
	const logoBase64 = Buffer.from(logoBuffer).toString('base64');
	console.log(logoBase64);

	const response = await UserService.uploadProfilePicture(jwtToken, locals.user?.id ?? '', logoBase64)
		.catch(() => undefined);

	if (!response) {
		throw redirect(303, '/');
	}

	return { message: 'success', newProfilePicture: response.data.data.profilePicture };
};
export const actions: Actions = {
	uploadProfilePicture,
};
