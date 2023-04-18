import type { Action, Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { uploadProfilePictureHelper } from '$lib/helpers/form.helper';

const uploadProfilePicture: Action = async (event) => {
	const { type, message, status } = await uploadProfilePictureHelper(event);
	if (type === 'fail') {
		return fail(status, { message });
	}
	throw redirect(303, message);
};
export const actions: Actions = {
	uploadProfilePicture
};
