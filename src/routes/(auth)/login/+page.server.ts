import type { Action, Actions } from '@sveltejs/kit';

const register: Action = async ({ request }) => {
	const form = await request.formData();
	const username = form.get('username') as string
	const password = form.get('password') as string;

};

export const actions: Actions = {
	register,
};