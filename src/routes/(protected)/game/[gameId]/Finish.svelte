<script lang="ts">
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import { goto } from '$app/navigation';
	import { user } from '@stores/user.store';
	import type { Game } from 'matchmaking-shared';

	type Win = 'draw' | 'win' | 'lost';
	export let game: Game;
	let opponentId = game.players.find((playerId) => playerId !== $user?.id)!;

	const records: Record<string, number> = {
		null: 0,
		[$user?.id ?? '']: 0,
		[opponentId]: 0
	};
	const getWinningPlayer = (): Win => {
		const { whoWin } = game;
		for (let i = 0; i < whoWin.length; i++) records[whoWin[i] ?? 'null'] += 1;

		if (records['null'] === 0) {
			if (records[$user?.id ?? ''] > records[opponentId]) return 'win';
			return 'lost';
		}

		if (records['null'] === 1) {
			if (records[$user?.id ?? ''] === 2) return 'win';
			if (records[opponentId] === 2) return 'lost';
			return 'draw';
		}

		if (records['null'] === 2) {
			if (records[$user?.id ?? ''] === 1) return 'win';
			if (records[opponentId] === 1) return 'lost';
			return 'draw';
		}

		return 'draw';
	};

	const result = getWinningPlayer();
</script>

<div class="flex justify-center items-center h-full flex-col gap-16">
	<span class="text-secondary text-xl font-poppins-medium text-center"
		>This game is now finished !</span
	>
	{#if result === 'draw'}
		<span class="text-secondary text-2xl font-poppins-medium text-center"
			>You finish this game with a draw !</span
		>
	{:else}
		<span class="text-secondary text-2xl font-poppins-medium text-center"
			>And you just {result} this game !</span
		>
	{/if}
	<div class="flex flex-col gap-8 [&>button]:text-xl">
		<PrimaryButton css="mx-auto" on:click={() => goto('/waiting')}>Go play another !</PrimaryButton>
		<PrimaryButton css="mx-auto" on:click={() => goto('/')}
			>Go back to the home page !</PrimaryButton
		>
	</div>
</div>
