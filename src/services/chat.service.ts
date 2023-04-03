import axios from 'axios';
import type { Range } from '@models/Chat';
import { getBaseURL } from '$lib/utils';

const getChats = async (jwtToken: string, range: Range) => {
	return await axios.get(`${getBaseURL()}/chat?start=${range.start}&end=${range.end}`, {
		headers: { Authorization: jwtToken }
	});
};

export default {
	getChats
};
