<script lang="ts">
	import type { LayoutServerData } from './$types';
	import EditableProfilePicture from '@components/EditableProfilePicture.svelte';
	import Frame from '@components/layout/Frame.svelte';
	import ChatCard from '@components/ChatCard.svelte';
	import { getWinRateRation } from '$lib/utils';
	import GoBack from '@components/layout/GoBack.svelte';

	export let data: LayoutServerData;
</script>

<div class="absolute m-6">
	<GoBack href="/" size={10} />
</div>

<div class="flex m-8 mt-16">
	<div class="relative w-fit">
		<EditableProfilePicture userData={data.user} />
		<h2 class="text-secondary mt-4 text-center text-2xl font-poppins-medium">
			{data.user.username}
		</h2>
	</div>
	<div class="flex flex-col ml-10">
		<span class="text-secondary text-lg flex-1 font-poppins-regular"
			>Number of wins : <b>{data.user.numberOfWins}</b></span
		>
		<span class="text-secondary text-lg flex-1 font-poppins-regular"
			>Number of looses : <b>{data.user.numberOfLoses}</b></span
		>
		<span class="text-secondary text-lg flex-1 font-poppins-regular"
			>Win Rate Ratio : <b>{getWinRateRation(data.user.numberOfWins, data.user.numberOfLoses)}</b
			></span
		>
	</div>
</div>

<Frame ulCss="h-full lg:m-0 my:auto" bottom={true} right={true}>
	{#if data.chats.length > 0}
		{#each data.chats as chat}
			<ChatCard addClasses="!w-[95%] mx-auto" {chat} isLast={false} getMore={() => undefined} />
		{/each}
	{:else}
		<h2 class="flex justify-center items-center text-2xl text-secondary h-full">No chats !</h2>
	{/if}
</Frame>
<slot />
