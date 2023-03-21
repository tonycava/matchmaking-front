<script lang="ts">
	import { page } from '$app/stores';
	import socket from '$lib/webSocketClient';
	import { game } from '@stores/game.store';
	import { onMount } from 'svelte';
	import type { Game, GameInfo } from '@models/User';
	import Choosing from './Choosing.svelte';
	import Reveal from './Reveal.svelte';
	import Finish from './Finish.svelte';
	import PageData = App.PageData;

	export let data: PageData;
	socket.emit('joinGame', $page.params.gameId);

	let gameStatus: Game = {
		state: 'choosing',
		whoWin: [null, null, null],
		round: 3,
		actualPlay: { 'b2c159f9-5a6d-4af3-b14f-b143554d3180': 'scissors' },
		timerPlay: 10,
		timerRev: 5,
		players: [
			'b2c159f9-5a6d-4af3-b14f-b143554d3180',
			'88e042c3-ceff-474f-83eb-fc186920ba76',
		],
	};


	onMount(() => {
		const gameInfo: GameInfo = JSON.parse(localStorage.getItem('game') || '{}');
		game.set(gameInfo);
	});

	$: console.log('game', $game);

	socket.on('update', (data: Game) => {
		gameStatus = data;
	});
</script>


{#if gameStatus?.state === "choosing"}
  <Choosing user={data.user} game={gameStatus} />
{:else if gameStatus?.state === "reveal"}
  <Reveal />
{:else if gameStatus?.state === "finished"}
  <Finish />
{/if}




