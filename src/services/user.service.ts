import axios, { type AxiosResponse } from 'axios';
import type { AMLResponse, Chat } from '@models/Chat';
import { getBaseURL } from '$lib/utils';
import type { User } from '@models/User';

const getUser = (
	jwtToken: string,
	userId: string,
): Promise<AxiosResponse<AMLResponse<{
	user: User & { numberOfWins: number, numberOfLoses: number },
	chats: Chat[]
}>>> => {
	return axios.get(`${getBaseURL()}/user`, {
		headers: {
			Authorization: jwtToken,
			userId,
		},
	});
};

const uploadProfilePicture = (token: string, userId: string, profilePicture: string): Promise<AxiosResponse<AMLResponse<
	{ profilePicture: string; }
>>> => {
	return axios.post(`${getBaseURL()}/user/upload-profile-picture`, {
		profilePicture,
	}, {
		headers: { Authorization: token },
	});
};

export default {
	getUser,
	uploadProfilePicture,
};
