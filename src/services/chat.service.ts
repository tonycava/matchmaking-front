import axios from 'axios';

export const getChat = async (token: string) => {
	return await axios.get(`${import.meta.env.VITE_API_URL}/chat`, { headers: { Authorization: token } });
};