import axios from 'axios';
import { getBaseURL } from '$lib/utils';

const getLeaderboard = async (jwtToken: string) => {
	return axios.get(`${getBaseURL()}/leaderboard`, { headers: { Authorization: jwtToken } });
};

export default {
	getLeaderboard,
};