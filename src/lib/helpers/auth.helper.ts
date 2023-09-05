import { user } from '@stores/user.store';
import Cookies from 'js-cookie';
import { COOKEYS } from '$lib/helpers/cookie.helper';
import { goto } from '$app/navigation';

export const disconnect = async () => {
	user.set(null);
	Cookies.remove(COOKEYS.JWT_TOKEN);
	await goto('/login');
};