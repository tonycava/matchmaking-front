<script lang="ts">
	import webSocketClient from '$lib/webSocketClient';
	import { user } from '@stores/user.store';
	import { page } from '$app/stores';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import { goto } from '$app/navigation';

	let message = '';
	const sendMessage = async () => {
		webSocketClient.emit('chat', { message, userId: $user?.id });
		message = '';
	}

	webSocketClient.on('newMessage', (data) => {
		messages = [...messages, data];
	});

	let messages = [];

	$: messages = $page.data.chats;

</script>

<div class='flex flex-col h-screen'>
	<div class='text-5xl'>
		{#if $user}
			<div class='text-secondary'>
				{`Hello ${$user.username}`}
			</div>
		{/if}
	</div>

	<div class='flex flex-1 justify-center items-center [&>button]:text-3xl'>
		{#if $user}
			<PrimaryButton on:click={() => goto('/waiting')}>Join the waiting room</PrimaryButton>
		{:else}
			<PrimaryButton on:click={goto('/login')}>Login</PrimaryButton>
		{/if}
	</div>

	<div class='fixed bottom-0 right-0 border'>
		{#each messages as message}
			<div class='text-secondary'>
				{message.content}
			</div>
		{/each}

		<form on:submit|preventDefault={sendMessage}>
			<input type="text" bind:value={message}/>
			<button type="submit" class='text-secondary'>Send message</button>
		</form>
	</div>
</div>
