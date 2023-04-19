<script lang="ts">
	import Sidebar from '@components/common/Sidebar.svelte';
	import type { UserInformation } from '@models/User';
	import type { Chat } from 'matchmaking-shared';
	import InputCheckbox from '@components/form/InputCheckbox.svelte';
	import ConfirmModal from '@components/common/ConfirmModal.svelte';
	import UserService from '@services/user.service';
	import Cookies from 'js-cookie';
	import { COOKEYS } from '$lib/helpers/cookie.helper';
	import { disconnect } from '$lib/helpers/auth.helper';

	export let data: { user: UserInformation, chats: Chat[] };
	export let isSideBarOpen: boolean;

	let showConfirmModal = false;
	let checked = data.user.isAccountPrivate;
	const handleChange = async (e) => {
		const value: 'Cancel' | 'Approved' = e.target.textContent;
		if (value === 'Cancel') {
			showConfirmModal = false;
			checked = data.user.isAccountPrivate;
			return;
		}
		const jwtToken = Cookies.get(COOKEYS.JWT_TOKEN) ?? '';

		try {
			const response = await UserService.changeStatus(jwtToken, checked);
			showConfirmModal = false;
			isSideBarOpen = false;
			checked = response.data.data.status;
			data.user.isAccountPrivate = response.data.data.status;
		} catch (e) {
			await disconnect();
		}
	};
</script>

{#if showConfirmModal}
  <ConfirmModal
    on:click={handleChange}
    tittle="Confirm"
    description="When your account is private, only those whom you approve can see your content, your current followers will not be affected."
  />
{/if}

<Sidebar bind:isSideBarOpen>
  <InputCheckbox bind:checked on:change={() => showConfirmModal = true} className="mx-auto mt-10" />
</Sidebar>