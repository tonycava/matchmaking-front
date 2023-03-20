<script lang="ts">
	import type { Move, User } from '@models/User';
	import socket from '$lib/webSocketClient';
	import { page } from '$app/stores';

	export let user: User;

	const moves: [Move, Move, Move] = ['rock', 'paper', 'scissors'];
	const onPlay = (move: Move) => {
		socket.emit('play', { gameId: $page.params.gameId, userId: user.id, move });
	};

	const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

</script>


<div class="flex gap-4 justify-center h-full">
  {#each moves as move}
    <button class="bg-primary p-2 rounded mt-auto" on:click={() => onPlay(move)}>Play: {capitalize(move)}</button>
  {/each}
</div>