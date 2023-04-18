import type { RequestEvent } from '@sveltejs/kit';
import { COOKEYS } from '$lib/helpers/cookie.helper';
import UserService from '@services/user.service';

export enum INPUT {
	USERNAME = 'username',
	PASSWORD = 'password',
	MESSAGE = 'message',

	PROFILE_PICTURE = 'profilePicture'
}

export const uploadProfilePictureHelper = async ({
	request, cookies, locals, params
}: RequestEvent): Promise<{ type: 'fail' | 'redirect'; status: number; message: string; }> => {
	const form = await request.formData();
	const profilePicture = form.get(INPUT.PROFILE_PICTURE) as File;
	const jwtToken = cookies.get(COOKEYS.JWT_TOKEN) ?? '';

	if (!profilePicture.size) return { status: 400, type: 'fail', message: 'No profile picture provided' };

	const logoBuffer = await profilePicture.arrayBuffer();
	const logoBase64 = Buffer.from(logoBuffer).toString('base64');

	const response = await UserService.uploadProfilePicture(
		jwtToken,
		locals.user?.id ?? '',
		logoBase64
	).catch(() => undefined);

	if (!response) {
		cookies.delete(COOKEYS.JWT_TOKEN);
		return {
			type: 'redirect',
			status: 303,
			message: "/login"
		};
	}

	const redirectUrl = params?.userId ? `/profile/${params.userId}` : '/profile';

	return {
		type: 'redirect',
		status: 303,
		message: redirectUrl
	};
};