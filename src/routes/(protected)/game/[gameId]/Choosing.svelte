<script lang="ts">
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import { user } from '@stores/user.store';
	import MoveToShow from '@components/game/MoveToShow.svelte';
	import { page } from '$app/stores';
	import type { Game, Move } from 'matchmaking-shared';
	import socket from '$lib/socket';

	export let game: Game;

	const moves: [Move, Move, Move] = ['rock', 'paper', 'scissors'];
	const onPlay = (move: Move) => {
		game.actualPlay[$user?.id ?? ''] = move;
		socket.emit('play', { gameId: $page.params.gameId, userId: $user?.id, move });
	};

	const capitalize = (str: string) => str?.charAt(0)?.toUpperCase() + str?.slice(1);
</script>

<div class="flex justify-center items-end h-full [&>svg]:h-32 [&>svg]:w-32">
	<MoveToShow move={game.actualPlay[$user?.id ?? '']} />
</div>

<div class="flex h-full justify-center items-center flex-col gap-8">
	<span class="text-secondary text-center text-2xl"
		>You are actually playing : {capitalize(game.actualPlay[$user?.id ?? ''])}</span
	>
	<div class="flex gap-4 [&>button]:text-xl">
		{#each moves as move}
			<PrimaryButton on:click={() => onPlay(move)}>Play : {capitalize(move)}</PrimaryButton>
		{/each}
	</div>
</div>
