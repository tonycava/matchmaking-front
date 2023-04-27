<script lang="ts">
	import { getWinRateRation } from '$lib/utils.js';
	import type { Leaderboard } from '@models/Leaderboard.js';

	export let leaderboardUser: Leaderboard;
	export let position: number;
</script>

<div class="font-poppins-medium relative mx-auto text-sm w-11/12 mt-4 bg-secondary p-2 rounded">
	<b class="font-bold">{leaderboardUser.username}</b> | Win : {leaderboardUser.numberOfWins} | Loose
	: {leaderboardUser.numberOfLosses} | WRR : {getWinRateRation(
		leaderboardUser.numberOfWins,
		leaderboardUser.numberOfLosses
	)}
	<span class="absolute right-2">#{position}</span>
</div>
