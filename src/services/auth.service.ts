import axios from 'axios';

export const register = async (username: string, password: string) => {
	return await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, password });
};

export default {
	register,
}