import type { RequestEvent } from '@sveltejs/kit';
import { COOKEYS } from '$lib/helpers/cookie.helper';
import UserService from '@services/user.service';
import { HttpStatusCode } from 'axios';

export enum INPUT {
	USERNAME = 'username',
	PASSWORD = 'password',
	MESSAGE = 'message',

	PROFILE_PICTURE = 'profilePicture',
	CODE = 'code'
}

export const uploadProfilePictureHelper = async ({
	request,
	cookies,
	locals,
	params
}: RequestEvent): Promise<{ type: 'fail' | 'redirect'; status: number; message: string }> => {
	const form = await request.formData();
	const profilePicture = form.get(INPUT.PROFILE_PICTURE) as File;
	const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	if (!profilePicture.size)
		return { status: 400, type: 'fail', message: 'No profile picture provided' };

	const logoBuffer = await profilePicture.arrayBuffer();
	const logoBase64 = Buffer.from(logoBuffer).toString('base64');

	const response = await UserService.uploadProfilePicture(
		jwtToken,
		locals.user?.id ?? '',
		logoBase64
	).catch((e) => {
		if (e.response.data.code === HttpStatusCode.TooManyRequests)
			return { type: 'fail', status: 400, message: e.response.data.message };
	});

	if (!response) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		cookies.delete(COOKEYS.QRCODE_URL);
		return {
			type: 'redirect',
			status: 303,
			message: '/login'
		};
	}

	if ('type' in response) {
		return { type: 'fail', status: 400, message: 'Please wait before upload a new profile image' };
	}

	const redirectUrl = params?.userId ? `/profile/${params.userId}` : '/profile';

	return {
		type: 'redirect',
		status: 303,
		message: redirectUrl
	};
};
