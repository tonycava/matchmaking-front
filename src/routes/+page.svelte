<script lang="ts">
	import webSocketClient from '$lib/webSocketClient';
	import { user } from '@stores/user.store';
	import { page } from '$app/stores';

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

<button>Go to the matchmaking</button>

{#each messages as message}
	<div class='text-secondary'>
		{message.content}
	</div>
{/each}

<form on:submit|preventDefault={sendMessage}>
	<input type="text" bind:value={message}/>
	<button type="submit">Send message</button>
</form>