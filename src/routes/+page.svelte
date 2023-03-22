<script lang="ts">
	import socket from '$lib/webSocketClient';
	import { user } from '@stores/user.store';
	import { page } from '$app/stores';
	import Cookies from 'js-cookie';
	import { COOKEYS, WEB_SOCKET_EVENT } from '$lib/utils';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import type { Chat } from '@models/Chat';
	import { goto } from '$app/navigation';

	let message = '';
	let chats: Chat[] = [];

	const handleSendMessage = async () => {
		socket.emit(WEB_SOCKET_EVENT.PLAY, { userId: $user?.id, message });
		message = '';
	};

	socket.on(WEB_SOCKET_EVENT.NEW_MESSAGE, (data) => {
		chats = [...chats, data];
	});

	const disconnect = () => {
		user.set(null);
		Cookies.remove(COOKEYS.JWT_TOKEN);
		goto('/login');
	};

	$: chats = $page.data.chats;
</script>

<div class="text-secondary flex justify-between font-poppins-medium m-4 text-2xl">
  <span class="flex-1">Welcome to AMLMatcher {$user?.username}</span>
  <PrimaryButton class="flex-1" on:click={disconnect}>Sign out</PrimaryButton>
</div>

{#each chats as chat}
  <div class='text-secondary'>
    {chat.content}
  </div>
{/each}

<form on:submit|preventDefault={handleSendMessage}>
  <input type="text" bind:value={message} />
  <PrimaryButton disabled={message === ''} type="submit">Send message</PrimaryButton>
</form>