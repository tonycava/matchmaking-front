<script lang="ts">
	import socket from '$lib/webSocketClient';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { GameInfo } from '@models/Game';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import { user } from '@stores/user.store';
	import { WEB_SOCKET_EVENT } from '$lib/utils';
	import { gameInfo } from '@stores/gameInfo.store';

	onMount(() => {
		window.addEventListener('beforeunload', () => {
			socket.emit(WEB_SOCKET_EVENT.LEAVE_WAITING, { userId: $user?.id });
		});
	});

	socket.on(WEB_SOCKET_EVENT.PARTNER, async (data: GameInfo) => {
		gameInfo.set(data);
		localStorage.setItem('gameInfo', JSON.stringify(data));
		await goto(`/game/${data.gameId}`);
	});

	socket.emit(WEB_SOCKET_EVENT.JOIN_WAITING, { userId: $user?.id, joinAt: new Date() });
</script>

<div class="flex justify-center items-center h-screen flex-col gap-8">
	<span class="text-secondary text-3xl font-poppins-medium"
		>You are now waiting another player !</span
	>
	<PrimaryButton on:click={() => goto('/')}>Go back on the home page</PrimaryButton>
</div>
