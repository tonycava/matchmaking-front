import axios, { type AxiosResponse } from 'axios';
import { getBaseURL } from '$lib/utils';
import type { AMLResponse } from '@models/Chat';

export const register = async (
	username: string,
	password: string
): Promise<
	AxiosResponse<
		AMLResponse<{
			token: string;
		}>
	>
> => {
	return await axios.post(`${getBaseURL()}/auth/register`, { username, password });
};

export const login = (
	username: string,
	password: string
): Promise<AxiosResponse<AMLResponse<{ token: string }>>> => {
	return axios.post(`${getBaseURL()}/auth/login`, { username, password });
};

export default {
	register,
	login
};
