<script lang="ts">
	import Sidebar from '@components/common/Sidebar.svelte';
	import type { UserInformation } from '@models/User';
	import type { Chat } from 'matchmaking-shared';
	import { formatDate } from '$lib/utils';
	import SimpleCard from '@components/common/Card/SimpleCard.svelte';

	export let data: { user: UserInformation; chats: Chat[] };
	export let isSideBarOpen: boolean;
</script>

<Sidebar bind:isSideBarOpen>
	<div class="flex gap-4 flex-col w-full overflow-y-auto h-full mt-10">
		{#if data.user.games.length > 0}
			{#each data.user.games as game}
				<SimpleCard
					text={`${data.user.username} just ${game.result} ${formatDate(new Date(game.createdAt))}`}
					className="w-[90%] mx-auto"
				/>
			{/each}
		{:else}
			<span class="text-2xl text-secondary flex justify-center mt-24">No parties play !</span>
		{/if}
	</div>
</Sidebar>
