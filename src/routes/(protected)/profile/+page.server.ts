import { type Action, type Actions, fail, redirect } from '@sveltejs/kit';
import { COOKEYS, INPUT } from '$lib/utils';
import UserService from '@services/user.service';

const uploadProfilePicture: Action = async ({ request, cookies, locals }) => {
	const form = await request.formData();
	const profilePicture = form.get(INPUT.PROFILE_PICTURE) as File;

	const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	if (!profilePicture.size) return fail(400, { message: 'No profile picture provided' });

	const logoBuffer = await profilePicture.arrayBuffer();
	const logoBase64 = Buffer.from(logoBuffer).toString('base64');

	const response = await UserService.uploadProfilePicture(
		jwtToken,
		locals.user?.id ?? '',
		logoBase64
	).catch(() => undefined);

	if (!response) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		throw redirect(303, '/login');
	}

	throw redirect(303, '/profile');
};
export const actions: Actions = {
	uploadProfilePicture
};
