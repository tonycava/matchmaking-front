<script lang="ts">
	import type { Game } from '@models/Game';
	import { user } from '@stores/user.store';
	import MoveToShow from '@components/MoveToShow.svelte';

	export let game: Game;
	let opponentId = game.players.find((playerId) => playerId !== $user?.id)!;
	let lostOrWin: 'lost' | 'win' = game.whoWin[game.round - 1] === $user?.id ? 'win' : 'lost';
</script>

<div class="justify-center items-center h-full flex flex-col gap-24 mt-10">
	<div
		class="text-center flex flex-col justify-center gap-8 font-poppins-medium text-secondary text-2xl [&>svg]:h-32 [&>svg]:w-32[&>svg]:mx-auto"
	>
		Your opponent play {game.actualPlay[opponentId]}
		<MoveToShow move={game.actualPlay[opponentId]} />
	</div>

	{#if game.whoWin[game.round - 1] === null}
		<span class="text-3xl text-secondary text-center p-2">Which mean that this round is a draw !</span>
	{:else}
		<span class="text-3xl text-secondary text-center p-2">Which mean that you {lostOrWin} this round !</span>
	{/if}

	<div
		class="text-center flex-col flex justify-center gap-8 font-poppins-medium text-secondary text-2xl [&>svg]:h-32 [&>svg]:mx-auto [&>svg]:w-32"
	>
		<MoveToShow move={game.actualPlay[$user?.id ?? '']} />
		<span class="pb-4">And you play {game.actualPlay[$user?.id ?? '']}</span>
	</div>
</div>
