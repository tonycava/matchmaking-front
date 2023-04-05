import axios from 'axios';
import { getBaseURL } from '$lib/utils';

export const register = async (username: string, password: string) => {
	return await axios.post(`${getBaseURL()}/auth/register`, { username, password });
};

export const login = async (username: string, password: string) => {
	return await axios.post(`${getBaseURL()}/auth/login`, { username, password });
};

export default {
	register,
	login
};
