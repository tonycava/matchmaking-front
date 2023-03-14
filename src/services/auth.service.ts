import axios from 'axios';

export const register = async (username: string, password: string) => {
	return await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, password });
};

export const login = async (username: string, password: string) => {
	return await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { username, password });
};

export default {
	register,
	login,
}