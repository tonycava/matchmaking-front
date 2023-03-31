import axios, { type AxiosResponse } from 'axios';
import type { AMLResponse } from '@models/Chat';
import { getBaseURL } from '$lib/utils';
import type { User } from '@models/User';

const getUser = (
	jwtToken: string,
	userId: string,
): Promise<AxiosResponse<AMLResponse<User & { profilePicture: string | null }>>> => {
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
