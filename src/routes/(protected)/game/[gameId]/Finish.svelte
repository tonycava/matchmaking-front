<script lang="ts">
	import type { Game } from '@models/Game';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import { goto } from '$app/navigation';

	export let game: Game;
</script>

<div class="flex justify-center items-center h-full flex-col gap-24">
  <span class="text-secondary text-xl font-poppins-medium text-center">This game is now finished !</span>

  <span class="text-secondary text-xl font-poppins-medium text-center">And you just win ! </span>

  <div class="flex flex-col gap-8 [&>button]:text-xl">
    <PrimaryButton on:click={() => goto("/waiting")}>Go play another !</PrimaryButton>
    <PrimaryButton on:click={() => goto("/")}>Go back to the home page !</PrimaryButton>
  </div>
</div>