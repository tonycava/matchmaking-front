import { type Action, type Actions, redirect } from '@sveltejs/kit';
import { uploadProfilePictureHelper } from '$lib/helpers/form.helper';

const uploadProfilePicture: Action = async (event) => {
	const { type, message } = await uploadProfilePictureHelper(event);
	if (type === 'fail') {
		throw redirect(303, `/profile/?error=too_many_request`);
	}
	throw redirect(303, `${message}?error=too_many_request`);
};
export const actions: Actions = {
	uploadProfilePicture
};
