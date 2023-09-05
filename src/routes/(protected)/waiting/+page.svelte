<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { GameInfo } from '@models/Game';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import { user } from '@stores/user.store';
	import { gameInfo } from '@stores/gameInfo.store';
	import Loading from '@components/common/Loading.svelte';
	import socket from '$lib/socket';
	import { WEB_SOCKET_EVENT } from 'matchmaking-shared';

	let interval;

	onMount(() => {
		socket.emit(WEB_SOCKET_EVENT.JOIN_WAITING, { userId: $user?.id, joinAt: new Date() });
		interval = setInterval(() => {
			socket.emit('alive', { userId: $user?.id, lastTimeAlive: new Date() });
		}, 1000 * 10); // 10 seconds
	});

	onDestroy(() => {
		clearInterval(interval)
	});

	socket.on(WEB_SOCKET_EVENT.PARTNER, (data: GameInfo) => {
		gameInfo.set(data);
		goto(`/game/${data.gameId}`);
	});
</script>

<div class="flex justify-center items-center h-screen flex-col">
	<span class="text-secondary text-3xl font-poppins-medium text-center p-4"
  >You are now waiting another player !</span
  >
  <Loading />
  <PrimaryButton on:click={() => goto('/')}>Go back on the home page</PrimaryButton>
</div>
