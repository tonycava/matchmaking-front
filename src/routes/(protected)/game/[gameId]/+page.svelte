<script lang="ts">
	import { page } from '$app/stores';
	import socket from '$lib/webSocketClient';
	import { onMount } from 'svelte';
	import type { Game } from '@models/Game';
	import Choosing from './Choosing.svelte';
	import Reveal from './Reveal.svelte';
	import Finish from './Finish.svelte';
	import Score from '@components/Score.svelte';
	import { WEB_SOCKET_EVENT } from '$lib/utils';
	import { gameInfo } from '@stores/gameInfo.store';

	let game: Game = {
		state: 'choosing',
		whoWin: [null, null, null],
		round: 1,
		actualPlay: {
			[$gameInfo.users[0]]: 'rock',
			[$gameInfo.users[1]]: 'rock'
		},
		timerPlay: 10,
		timerRev: 5,
		players: $gameInfo.users
	};

	onMount(() => {
		const gameInfoStr = localStorage.getItem('gameInfo');
		gameInfo.set(JSON.parse(gameInfoStr ?? '{}'));
		socket.emit(WEB_SOCKET_EVENT.JOIN_GAME, $page.params.gameId);
	});

	socket.on(WEB_SOCKET_EVENT.UPDATE, (data: Game) => {
		game = data;
	});
</script>

<div class="flex">
	<div class="text-3xl text-secondary m-4 relative flex-1">Round : <b>{game.round}</b></div>
	<Score scores={game.whoWin} />
	{#if game.state === 'choosing'}
		<div class="text-3xl text-secondary m-4 relative flex-1 justify-end flex">
			Time since next reveal :
			<b>{game.timerPlay}</b>
		</div>
	{:else if game?.state === 'reveal'}
		<div class="text-3xl text-secondary m-4 relative flex-1 justify-end flex">
			Time since next round :
			<b>{game.timerRev}</b>
		</div>
	{:else if game.state === 'finished'}
		<div class="text-3xl text-secondary m-4 relative flex-1 justify-end flex">
			Your game is : &nbsp;<b>finished</b>
		</div>
	{/if}
</div>

{#if game.state === 'choosing'}
	<Choosing {game} />
{:else if game.state === 'reveal'}
	<Reveal {game} />
{:else if game.state === 'finished'}
	<Finish {game} />
{/if}
