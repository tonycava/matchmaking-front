<script lang="ts">
	import type { Game } from '@models/Game';
	import { user } from '@stores/user.store';
	import MoveToShow from '@components/MoveToShow.svelte';

	export let game: Game;
	let opponentId: string;
	let lostOrWin: 'lost' | 'win';

	$: lostOrWin = game.whoWin[game.round - 1] === $user?.id ? 'win' : 'lost';
	$: opponentId = game.players.find((playerId) => playerId !== $user?.id);
</script>


<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-24">
  <div
    class="text-center flex flex-col justify-center gap-8 font-poppins-medium text-secondary text-2xl [&>svg]:h-32 [&>svg]:w-32[&>svg]:mx-auto">
    Your opponent play {game.actualPlay[opponentId]}
    <MoveToShow move={game.actualPlay[opponentId]} />
  </div>

  {#if game.whoWin[game.round - 1] === null}
    <span class="text-3xl text-secondary">Which mean that this round is a draw !</span>
  {:else}
    <span class="text-3xl text-secondary">Which mean that you {lostOrWin} this round !</span>
  {/if}

  <div
    class="text-center flex-col flex justify-center gap-8 font-poppins-medium text-secondary text-2xl [&>svg]:h-32 [&>svg]:mx-auto [&>svg]:w-32">
    <MoveToShow move={game.actualPlay[$user?.id]} />
    And you play {game.actualPlay[$user?.id]}
  </div>
</div>