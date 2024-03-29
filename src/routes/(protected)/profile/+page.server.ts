import { type Action, type Actions, fail, redirect } from '@sveltejs/kit';
import { uploadProfilePictureHelper } from '$lib/helpers/form.helper';

const uploadProfilePicture: Action = async (event) => {
	const { type, message, status } = await uploadProfilePictureHelper(event);
	if (type === 'fail') {
		return fail(status, {
			internalError: message
		});
	}
	throw redirect(303, message);
};

export const actions: Actions = {
	uploadProfilePicture
};
