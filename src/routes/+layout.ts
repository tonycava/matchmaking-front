import Cookies from 'js-cookie';
import { COOKEYS } from '$lib/utils';
import jwtDecode from 'jwt-decode';
import type { User } from '@models/User';
import { user } from '@stores/user.store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	const token = Cookies.get(COOKEYS.JWT_TOKEN);
	if (!token) return;
	const userObj = jwtDecode<User | null>(token);
	user.set(userObj);

	return { success: true };
};
