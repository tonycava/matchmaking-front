import axios, { type AxiosResponse } from 'axios';
import { getBaseURL } from '$lib/utils';
import type { AMLResponse } from '@models/Chat';
import type { Direct } from 'matchmaking-shared';
import type { DirectOpponentUser } from '@models/User';

const getDirectsChats = async (
	jwtToken: string,
	userIdToFetch: string
): Promise<
	AxiosResponse<
		AMLResponse<{
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			directs: Direct[];
			[key: string]: DirectOpponentUser
		}>
	>
> => {
	return axios.get(`${getBaseURL()}/direct/directs`, {
		headers: { Authorization: jwtToken, userIdToFetch }
	});
};

type Conversation = {
	person: {
		id: string;
		username: string;
		profilePicture: string;
	};
	lastMessage: string;
};

const getDirectsConversations = async (
	jwtToken: string
): Promise<AxiosResponse<AMLResponse<Conversation[]>>> => {
	return axios.get(`${getBaseURL()}/direct`, {
		headers: { Authorization: jwtToken }
	});
};

export default {
	getDirectsChats,
	getDirectsConversations
};
