import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import type { User } from '@models/User';
import { user } from '@stores/user.store';
import type { LayoutLoad } from './$types';
import { COOKEYS } from '$lib/helpers/cookie.helper';

export const load: LayoutLoad = () => {
	const token = Cookies.get(COOKEYS.JWT_TOKEN);
	if (!token) return;
	const userObj = jwtDecode<User | null>(token);
	user.set(userObj);

	return { success: true };
};
