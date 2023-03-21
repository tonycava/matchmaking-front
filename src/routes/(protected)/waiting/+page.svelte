<script lang="ts">
	import socket from '$lib/webSocketClient';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { GameInfo } from '@models/User';
	import { game } from '@stores/game.store';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';

	export let data: App.PageData;

	onMount(() => {

		window.addEventListener('beforeunload', () => {
			socket.emit('leaveWaiting', { userId: data.user?.id });
		});
	});

	socket.on('partner', async (data: GameInfo) => {
		localStorage.setItem('game', JSON.stringify(data));
		game.set(data);
		await goto(`/game/${data.gameId}`);
	});

	socket.emit('joinWaiting', { userId: data.user?.id, joinAt: new Date() });

</script>

<div class="flex justify-center items-center h-screen flex-col gap-8">
  <span class="text-secondary text-3xl font-poppins-medium">You are now waiting another player !</span>
  <PrimaryButton on:click={() => goto("/")}>Go back on the home page</PrimaryButton>
</div>