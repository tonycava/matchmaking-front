import axios, { type AxiosResponse } from 'axios';
import { getBaseURL } from '$lib/utils';
import type { AMLResponse } from '@models/Chat';

const register = async (
	username: string,
	password: string
): Promise<
	AxiosResponse<
		AMLResponse<{
			token: string;
			qrCodeURL: string;
		}>
	>
> => {
	return await axios.post(`${getBaseURL()}/auth/register`, { username, password });
};

const login = (
	username: string,
	password: string
): Promise<AxiosResponse<AMLResponse<{
	token: string;
	qrCodeURL: string;
}>>> => {
	return axios.post(`${getBaseURL()}/auth/login`, { username, password });
};

const verifyOTP = (code: string, jwtToken: string): Promise<AxiosResponse<AMLResponse<{
	token: string;
}>>> => {
	return axios.post(`${getBaseURL()}/auth/verify-otp`, { code }, { headers: { Authorization: jwtToken } });
};

const generateQRCode = (
	jwtToken: string
): Promise<AxiosResponse<AMLResponse<{
	qrCodeURL: string;
}>>> => {
	return axios.get(`${getBaseURL()}/auth/generate-qr-code`, {
		headers: { Authorization: jwtToken }
	})
};


export default {
	register,
	login,
	verifyOTP,
	generateQRCode
};
