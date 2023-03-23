import axios from 'axios';
import type { Range } from '@models/Chat';
import { browser } from '$app/environment';

const getChats = async (jwtToken: string, range: Range) => {
	const ENDPOINT_URI = browser ? import.meta.env.VITE_EXTERNAL_API_URL : import.meta.env.VITE_API_URL;
	return await axios.get(`${ENDPOINT_URI}/chat?start=${range.start}&end=${range.end}`, { headers: { Authorization: jwtToken } });
};

export default {
	getChats
};