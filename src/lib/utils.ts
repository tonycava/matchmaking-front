import type { CookieSerializeOptions } from 'cookie';
import { browser } from '$app/environment';
import { user } from '@stores/user.store';
import Cookies from 'js-cookie';
import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import UserService from '@services/user.service';

export enum INPUT {
	USERNAME = 'username',
	PASSWORD = 'password',
	MESSAGE = 'message',

	PROFILE_PICTURE = 'profilePicture'
}

export const getBaseURL = () => (browser ? env.PUBLIC_EXTERNAL_API_URL : env.PUBLIC_API_URL);

export const disconnect = async () => {
	user.set(null);
	Cookies.remove(COOKEYS.JWT_TOKEN);
	await goto('/login');
};

export enum WEB_SOCKET_EVENT {
	CONNECT = 'connect',
	LEAVE_WAITING = 'leaveWaiting',
	JOIN_GAME = 'joinGame',
	PLAY = 'play',
	UPDATE = 'update',
	JOIN_WAITING = 'joinWaiting',
	CHAT = 'chat',
	NEW_MESSAGE = 'newMessage',
	PARTNER = 'partner'
}

export const getWinRateRation = (numberOfWins: number, numberOfLosses: number) => {
	if (numberOfWins === 0 && numberOfLosses === 0) return 'No game !';

	if (numberOfWins === 0) return '0%';
	if (numberOfLosses === 0) return '100%';

	return `${((numberOfWins / numberOfLosses) * 100).toFixed(0)}%`;
};

export enum COOKEYS {
	JWT_TOKEN = 'jwt_token'
}

export const defaultCookiesOptions: CookieSerializeOptions = {
	path: '/',
	httpOnly: false,
	// sameSite: 'strict',
	secure: process.env.NODE_ENV === 'production',
	maxAge: 60 * 60 * 24 * 3
};


type Result = {
	type: 'fail' | 'redirect';
	status: number;
	message: string;
}

export const uploadProfilePictureUtils = async ({
	request, cookies, locals, params
}: RequestEvent): Promise<Result> => {
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
		throw redirect(303, '/login');
	}

	const redirectUrl = params?.userId ? `/profile/${params.userId}` : '/profile';

	return {
		type: 'redirect',
		status: 303,
		message: redirectUrl
	};
};
