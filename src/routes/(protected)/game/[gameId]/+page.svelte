<script lang="ts">
	import { page } from '$app/stores';
	import socket from '$lib/webSocketClient';
	import { onMount } from 'svelte';
	import type { Game } from '@models/Game';
	import Choosing from './Choosing.svelte';
	import Reveal from './Reveal.svelte';
	import Finish from './Finish.svelte';
	import Score from '@components/Score.svelte';

	let game: Game = {
		state: 'choosing',
		whoWin: ['3f31aad2-73f5-4f05-9d28-a67a930c35b3', null, 'f35f21e2-ce58-4b5c-ab7d-87338578f65d'],
		round: 3,
		actualPlay: { '3f31aad2-73f5-4f05-9d28-a67a930c35b3': 'scissors' },
		timerPlay: 10,
		timerRev: 5,
		players: [
			'b2c159f9-5a6d-4af3-b14f-b143554d3180',
			'88e042c3-ceff-474f-83eb-fc186920ba76',
		],
	};

	onMount(() => {
		socket.emit('joinGame', $page.params.gameId);
	});

	socket.on('update', (data: Game) => {
		game = data;
	});
</script>

<div class="flex justify-between">
  <div class="text-3xl text-secondary m-4 relative">Round : <b>{game.round}</b></div>
  <Score scores={game.whoWin} />

  {#if game?.state === "choosing"}
    <div class="text-3xl text-secondary m-4 relative">Time since next reveal : <b>{game.timerPlay}</b></div>
  {:else if game?.state === "reveal"}
    <div class="text-3xl text-secondary m-4 relative">Time since next round : <b>{game.timerRev}</b></div>
  {:else if game?.state === "finished"}
    <div class="text-3xl text-secondary m-4 relative">Your game is : <b>finished</b></div>
  {/if}
</div>

{#if game?.state === "choosing"}
  <Choosing game={game} />
{:else if game?.state === "reveal"}
  <Reveal />
{:else if game?.state === "finished"}
  <Finish />
{/if}




