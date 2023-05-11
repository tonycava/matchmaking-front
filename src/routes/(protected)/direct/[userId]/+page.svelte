<script lang="ts">
	import type { PageServerData, PageServerParentData } from './$types';
	import { user } from '@stores/user.store';
	import DirectFrame from '@components/layout/DirectFrame.svelte';
	import { INPUT } from '$lib/helpers/form.helper';
	import FormActon from '@components/common/FormActon.svelte';
	import type { FormActionResponse } from '@models/Error';
	import { applyAction } from '$app/forms';
	import socket from '$lib/socket';
	import DirectCard from '@components/common/Card/DirectCard.svelte';
	import type { Direct } from 'matchmaking-shared';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import type { DirectOpponentUser } from '@models/User';

	let message = '';
	export let data: PageServerParentData & PageServerData;

	let directOpponentUser: DirectOpponentUser;
	$: directOpponentUser = data.data[$page.params.userId] as DirectOpponentUser;

	socket.emit('joinDirect', { to: $user?.id, from: $page.params.userId });

	socket.on('newDirect', async (newDirect: Direct) => {
		if (
			!(
				newDirect.personWhoSendId === $page.params.userId ||
				newDirect.personWhoRecivedId === $page.params.userId
			)
		)
			return;
		data.data.directs = [newDirect, ...data.data.directs];
		await invalidateAll();
	});

	const handleSubmit = (): FormActionResponse => {
		return async ({ result }) => {
			await applyAction(result);
			message = '';
		};
	};
</script>

<DirectFrame>
  <div on:click class="flex mx-auto justify-center items-center h-full gap-2">
    <img
      src={directOpponentUser?.profilePicture
				? `data:image/png;base64,${directOpponentUser?.profilePicture}`
				: '/default.png'}
      class="w-[4%] rounded-full"
      alt="profile picture image of the user {directOpponentUser?.username}"
    />
    <div class="justify-center flex-col flex">
      <span class="text-xl text-secondary font-poppins-medium">{directOpponentUser?.username}</span>
    </div>
  </div>
</DirectFrame>

<ul class="ti-anchor h-[80%] w-full overflow-y-auto flex flex-col flex-col-reverse">
  {#each data.data.directs as direct}
    <DirectCard {direct} {directOpponentUser} />
  {/each}
</ul>

<FormActon textButton="Send message" addClasses="w-full absolute bottom-0" placeholder="Message" name={INPUT.MESSAGE} bind:value={message} {handleSubmit} />
