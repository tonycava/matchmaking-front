<script lang="ts">
	import { inview, type Options } from 'svelte-inview';
	import { user } from '@stores/user.store.js';
	import type { Chat } from 'matchmaking-shared';
	import { getRelativeTime } from '$lib/date.utils';

	export let isLast: boolean;
	export let chat: Chat;
	export let getMoreChat: (() => void) | (() => Promise<void>) = () => undefined;
	export let addClasses = '';

	const since = getRelativeTime(new Date(chat.createdAt));
	const options: Options = { rootMargin: '100px' };
</script>

{#if isLast}
	<li
		use:inview={options}
		on:inview_enter={getMoreChat}
		class="break-words rounded w-[calc(60%-.75rem)] mt-2 p-1 {chat.userId === $user?.id
			? 'ml-auto mr-2 bg-secondary text-black'
			: 'ml-2 bg-[#84743e]'} {addClasses}"
	>
		<div class="flex justify-between">
			<a
				href={`/profile/${chat.userId}`}
				class="text-sm font-poppins-regular hover:underline {chat.user.role === 'ADMIN' &&
					'text-red-600'}">{chat.user.username} : <br /></a
			>
			<span class="text-sm font-poppins-regular">{since}</span>
		</div>
		<p class="font-poppins-medium pt-2">{chat.content}</p>
	</li>
{:else if chat.userId === $user?.id}
	<li
		class="break-words rounded bg-secondary text-black p-1 w-[calc(60%-.75rem)] mt-2 mr-2 ml-auto {addClasses}"
	>
		<div class="flex justify-between">
			<a
				href={`/profile/${chat.userId}`}
				class="text-sm font-poppins-regular hover:underline {chat.user.role === 'ADMIN' &&
					'text-red-600'}">{chat.user.username} : <br /></a
			>
			<span class="text-sm font-poppins-regular">{since}</span>
		</div>
		<p class="font-poppins-medium pt-2">{chat.content}</p>
	</li>
{:else}
	<li
		class="break-words rounded bg-[#84743e] text-black p-1 w-[calc(60%-.75rem)] mt-2 ml-2 {addClasses}"
	>
		<div class="flex justify-between">
			<a
				href={`/profile/${chat.userId}`}
				class="text-sm font-poppins-regular hover:underline {chat.user.role === 'ADMIN' &&
					'text-red-600'}">{chat.user.username} : <br /></a
			>
			<span class="text-sm font-poppins-regular">{since}</span>
		</div>
		<p class="font-poppins-medium pt-2">{chat.content}</p>
	</li>
{/if}
