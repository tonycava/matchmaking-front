<script lang="ts">
	import type { Move } from '@models/Game';
	import type { Game } from '@models/Game';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import IconScissorsSolid from '@components/svg/IconScissorsSolid.svelte';
	import IconHandBackFistSolid from '@components/svg/IconHandBackFistSolid.svelte';
	import IconHandSolid from '@components/svg/IconHandSolid.svelte';
	import { user } from '@stores/user.store';
	import MoveToShow from '@components/MoveToShow.svelte';

	export let game: Game;

	const moves: [Move, Move, Move] = ['rock', 'paper', 'scissors'];
	const onPlay = (move: Move) => {
		console.log('play', move);
		game.actualPlay[$user?.id] = move;
		// socket.emit('play', { gameId: $page.params.gameId, userId: user.id, move });
	};

	const capitalize = (str: string) => str?.charAt(0)?.toUpperCase() + str?.slice(1);
</script>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 z-10 [&>svg]:h-32 [&>svg]:w-32">
  <MoveToShow move={game.actualPlay[$user?.id]} />
</div>

<div class="absolute bottom-40 flex gap-4 left-1/2 flex-col gap-8 -translate-x-1/2">
  <span
    class="text-secondary text-center text-2xl">You are actually playing : {capitalize(game.actualPlay[$user?.id])}</span>
  <div class="flex gap-4 [&>button]:text-xl">
    {#each moves as move}
      <PrimaryButton on:click={() => onPlay(move)}>Play : {capitalize(move)}</PrimaryButton>
    {/each}
  </div>
</div>