import axios, { type AxiosResponse } from 'axios';
import type { AMLResponse } from '@models/Chat';
import { getBaseURL } from '$lib/utils';
import type { Application, Follow, UserInformation } from '@models/User';
import type { Chat } from 'matchmaking-shared';

const getUser = (
	jwtToken: string,
	userId: string
): Promise<
	AxiosResponse<
		AMLResponse<{
			user: UserInformation
			chats: Chat[];
		}>
	>
> => {
	return axios.get(`${getBaseURL()}/user`, {
		headers: {
			Authorization: jwtToken,
			userId
		}
	});
};

const uploadProfilePicture = (
	token: string,
	userId: string,
	profilePicture: string
): Promise<AxiosResponse<AMLResponse<{ profilePicture: string }>>> => {
	return axios.post(
		`${getBaseURL()}/user/upload-profile-picture`,
		{
			profilePicture
		},
		{
			headers: { Authorization: token }
		}
	);
};
const changeStatus = (token: string, status: boolean): Promise<AxiosResponse<AMLResponse<{ status: boolean }>>> => {
	return axios.patch(`${getBaseURL()}/user/update-status`, { status }, { headers: { Authorization: token } });
};

export default {
	getUser,
	uploadProfilePicture,
	changeStatus,
};
