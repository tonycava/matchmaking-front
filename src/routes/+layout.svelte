<script lang="ts">
	import '../styles/app.css';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { COOKEYS } from '$lib/utils';
	import jwtDecode from 'jwt-decode';
	import { type User } from '@models/User';
	import { user } from '@stores/user.store';

	onMount(() => {
		const token = Cookies.get(COOKEYS.JWT_TOKEN) ?? '';
		const userObj = jwtDecode<User | null>(token);
		user.set(userObj);
	});
</script>

<slot />
