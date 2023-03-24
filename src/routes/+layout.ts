import type { Load } from '@sveltejs/kit';
import { browser } from '$app/environment';
import Cookies from 'js-cookie';
import { COOKEYS } from '$lib/utils';
import jwtDecode from 'jwt-decode';
import type { User } from '@models/User';
import { user } from '@stores/user.store';

export const load: Load = () => {
	if (!browser) return;

	const token = Cookies.get(COOKEYS.JWT_TOKEN);
	if (!token) return;
	const userObj = jwtDecode<User | null>(token);
	user.set(userObj);

	return { success: true };
};