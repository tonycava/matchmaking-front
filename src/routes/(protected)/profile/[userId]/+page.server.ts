import type { Action, Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { uploadProfilePictureUtils } from '$lib/utils';

const uploadProfilePicture: Action = async (event) => {
	const { type, message, status } = await uploadProfilePictureUtils(event);
	if (type === 'fail') {
		return fail(status, { message });
	}
	throw redirect(303, message);
};
export const actions: Actions = {
	uploadProfilePicture
};
