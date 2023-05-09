<script lang="ts">
	import PersonCard from '@components/common/Card/PersonCard.svelte';
	import { goto } from '$app/navigation';
	import type { LayoutServerData } from './$types';
	import { user } from '@stores/user.store';
	import GoBack from '@components/common/GoBack.svelte';
	import DirectFrame from '@components/layout/DirectFrame.svelte';

	export let data: LayoutServerData;
</script>

<GoBack href="/" size={12} className="p-6 absolute" />

<div class="w-full h-[90%] my-auto">
	<div class="w-10/12 mx-auto h-full border-2 flex border-secondary rounded">
		<div class="w-[30%] h-full gap-2 flex flex-col border-r-secondary border-r-2">
			<DirectFrame>
				<span class="text-secondary text-2xl text-center flex justify-center items-center h-full">{$user?.username}</span>
			</DirectFrame>
			{#each data.conversations as conversation}
				<PersonCard
					on:click={() => goto(`/direct/${conversation.person.id}`)}
					name={conversation.person.username}
					lastMessage={conversation.lastMessage}
					profilePicture={conversation.person.profilePicture
						? `data:image/png;base64,${conversation.person.profilePicture}`
						: '/default.png'}
				/>
			{/each}
		</div>
		<div class="w-full relative h-full">
			<slot />
		</div>
	</div>
</div>
