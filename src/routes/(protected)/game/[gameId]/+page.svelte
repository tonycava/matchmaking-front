<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Choosing from './Choosing.svelte';
	import Reveal from './Reveal.svelte';
	import Finish from './Finish.svelte';
	import Score from '@components/game/Score.svelte';
	import { gameInfo } from '@stores/gameInfo.store';
	import type { Game } from 'matchmaking-shared';
	import { WEB_SOCKET_EVENT } from 'matchmaking-shared';
	import socket from '$lib/socket';

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
		socket.emit(WEB_SOCKET_EVENT.JOIN_GAME, $page.params.gameId);
		const gameInfoStr = localStorage.getItem('gameInfo');
		if (!gameInfoStr) {
			localStorage.setItem('gameInfo', JSON.stringify($gameInfo));
			return;
		}
		gameInfo.set(JSON.parse(gameInfoStr ?? '{}'));
	});

	socket.on(WEB_SOCKET_EVENT.UPDATE, (data: Game) => {
		game = data;
	});
</script>

<div class="flex flex-col lg:flex-row">
	<div class="text-3xl text-secondary m-4 flex gap-2 justify-center lg:justify-start flex-1">
		Round : <b>{game.round}</b>
	</div>
	<Score scores={game.whoWin} />
	{#if game.state === 'choosing'}
		<div
			class="text-3xl text-secondary m-4 relative flex-1 lg:justify-end text-center justify-center gap-2 flex"
		>
			<span>Time since next reveal : <b>{game.timerPlay}</b></span>
		</div>
	{:else if game?.state === 'reveal'}
		<div
			class="text-3xl text-secondary m-4 relative flex-1 lg:justify-end text-center justify-center gap-2 flex"
		>
			<span>Time since next round : <b>{game.timerRev}</b></span>
		</div>
	{:else if game.state === 'finished'}
		<div
			class="text-3xl text-secondary m-4 relative flex-1 lg:justify-end text-center justify-center gap-2"
		>
			<span>Your game is : <b>finished</b></span>
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
