<script lang="ts">
	import socket from '$lib/webSocketClient';
	import { user } from '@stores/user.store';
	import { page } from '$app/stores';
	import Cookies from 'js-cookie';
	import { COOKEYS, WEB_SOCKET_EVENT } from '$lib/utils';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import type { Chat, Range } from '@models/Chat';
	import { goto } from '$app/navigation';
	import IconMessageSolid from '@components/svg/IconMessageSolid.svelte';
	import ChatCard from '@components/ChatCard.svelte';
	import ChatService from '@services/chat.service';

	let message = '';
	let chats: Chat[] = [];
	let haveMoreChat = true;

	const RATIO = 11;

	let range: Range = {
		start: 0,
		end: RATIO,
	};

	const disconnect = () => {
		user.set(null);
		Cookies.remove(COOKEYS.JWT_TOKEN);
		goto('/login');
	};

	const handleSendMessage = async () => {
		socket.emit(WEB_SOCKET_EVENT.CHAT, { userId: $user?.id, message });
		message = '';
	};

	socket.on(WEB_SOCKET_EVENT.NEW_MESSAGE, (chat: Chat) => chats = [chat, ...chats]);

	const getMore = async () => {
		if (!haveMoreChat) return;
		range = { start: range.end, end: range.end + RATIO };

		try {
			const jwtToken = Cookies.get(COOKEYS.JWT_TOKEN) ?? '';
			const { data } = await ChatService.getChats(jwtToken, range);
			if (data.data.messages.length === 0 || data.data.messages.length < RATIO - 1) haveMoreChat = false;
			chats = [...chats, ...data.data.messages];
		} catch (e) {
			await disconnect();
		}
	};

	$: chats = $page.data.chats;
</script>

<div class="text-secondary flex justify-between font-poppins-medium m-4 text-2xl">
  <span class="flex-1">Welcome to AML-Matcher {$user?.username}</span>
  <PrimaryButton class="flex-1" on:click={disconnect}>Sign out</PrimaryButton>
</div>

<div class='flex flex-1 h-screen justify-center items-center [&>button]:text-3xl'>
  <PrimaryButton on:click={() => goto('/waiting')}>Join the waiting room</PrimaryButton>
</div>

<div class='fixed w-96 h-96 bottom-0 right-0 border border-secondary'>
  <ul class='ti-anchor h-3/4 w-full overflow-y-auto flex flex-col-reverse'>
    {#each chats as chat, i}
      <ChatCard isLast={i === chats.length -1} chat={chat} getMore={getMore} />
    {/each}
  </ul>

  <form class="flex absolute bottom-0 gap-2 m-1" on:submit|preventDefault={handleSendMessage}>
    <fieldset class="bg-primary mx-auto flex p-2 rounded gap-4 justify-center [&>svg]:w-6 [&>svg]:h-6 [&>svg]:my-auto">
      <IconMessageSolid color="#ffeba7" />
      <input class="bg-primary text-secondary placeholder-gray-500 outline-0 h-10 p-1 w-48 rounded text-sm"
             placeholder="Message"
             bind:value={message}
             type="text" />
    </fieldset>
    <PrimaryButton type="submit">Send message</PrimaryButton>
  </form>
</div>