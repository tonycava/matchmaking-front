import axios, { type AxiosResponse } from 'axios';
import type { AMLResponse } from '@models/Chat';
import { getBaseURL } from '$lib/utils';
import type { Chat, Range } from 'matchmaking-shared';

const getChats = (
	jwtToken: string,
	range: Range
): Promise<AxiosResponse<AMLResponse<{ messages: Chat[] }>>> => {
	return axios.get(`${getBaseURL()}/chat?start=${range.start}&end=${range.end}`, {
		headers: { Authorization: jwtToken }
	});
};

export default {
	getChats
};
