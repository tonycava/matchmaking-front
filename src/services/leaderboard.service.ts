import axios, { type AxiosResponse } from 'axios';
import { getBaseURL } from '$lib/utils';
import type { AMLResponse } from '@models/Chat';
import type { Leaderboard } from '@models/Leaderboard';

const getLeaderboard = (
	jwtToken: string
): Promise<AxiosResponse<AMLResponse<{ winners: Leaderboard[] }>>> => {
	return axios.get(`${getBaseURL()}/leaderboard`, { headers: { Authorization: jwtToken } });
};

export default {
	getLeaderboard
};
