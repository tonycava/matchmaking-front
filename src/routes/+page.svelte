<script lang="ts">
	import socket from '$lib/webSocketClient';
	import { user } from '@stores/user.store';
	import { page } from '$app/stores';
	import Cookies from 'js-cookie';
	import { COOKEYS, disconnect, WEB_SOCKET_EVENT, INPUT } from '$lib/utils';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import type { Chat, Range } from '@models/Chat';
	import { goto } from '$app/navigation';
	import ChatCard from '@components/ChatCard.svelte';
	import ChatService from '@services/chat.service';
	import Frame from '@components/layout/Frame.svelte';
	import InputFieldset from '@components/form/InputFieldset.svelte';
	import type { Leaderboard } from '@models/Leaderboard';
	import { applyAction, enhance } from '$app/forms';
	import type { FormActionResponse } from '@models/Error';

	let message = '';
	let chats: Chat[] = [];
	let haveMoreChat = true;

	const RATIO = 11;
	let range: Range = { start: 0, end: RATIO };

	const handleSendMessage = (): FormActionResponse => {
		return async ({ result }) => {
			await applyAction(result);
			message = '';
		};
	};

	socket.on(WEB_SOCKET_EVENT.NEW_MESSAGE, (chat: Chat) => (chats = [chat, ...chats]));

	const getMore = async () => {
		if (!haveMoreChat) return;
		range = { start: range.end, end: range.end + RATIO };

		try {
			const jwtToken = Cookies.get(COOKEYS.JWT_TOKEN) ?? '';
			const { data } = await ChatService.getChats(jwtToken, range);
			if (data.data.messages.length === 0 || data.data.messages.length < RATIO - 1)
				haveMoreChat = false;
			chats = [...chats, ...data.data.messages];
		} catch (e) {
			await disconnect();
		}
	};

	const getWinRate = (leaderboardUser: Leaderboard) => {
		if (leaderboardUser.numberOfWins === 0 && leaderboardUser.numberOfLosses === 0)
			return 'No game !';

		if (leaderboardUser.numberOfWins === 0) return '0%';
		if (leaderboardUser.numberOfLosses === 0) return '100%';

		return `${((leaderboardUser.numberOfWins / leaderboardUser.numberOfLosses) * 100).toFixed(0)}%`;
	};

	$: chats = $page.data.chats;
</script>

<div class="text-secondary flex justify-between font-poppins-medium m-4 text-2xl">
	<span class="flex-1">Welcome to AML-Matcher {$user?.username}</span>
	<PrimaryButton css="flex-1" on:click={disconnect}>Logout</PrimaryButton>
</div>

<div class="flex flex-1 h-screen justify-center items-center [&>button]:text-3xl">
	<PrimaryButton on:click={() => goto('/waiting')}>Join the waiting room</PrimaryButton>
</div>

<Frame bottom={true} right={true} isReversed={true}>
	{#each chats as chat, i}
		<ChatCard isLast={i === chats.length - 1} {chat} {getMore} />
	{/each}
	<form method="POST" use:enhance={handleSendMessage} class="flex absolute bottom-0 gap-2 m-1">
		<InputFieldset
			placeholder="Message"
			name={INPUT.MESSAGE}
			size={8}
			bind:value={message}
			src="/icons/IconMessageSolid.svg"
		/>
		<PrimaryButton type="submit">Send message</PrimaryButton>
	</form>
</Frame>

<Frame bottom={true} left={true}>
	{#each $page.data.leaderboard as leaderboardUser, i}
		<div
			class="font-poppins-medium relative mx-auto text-sm w-11/12 p-3 mt-4 bg-secondary p-2 rounded"
		>
			<b class="font-bold">{leaderboardUser.username}</b> | Win : {leaderboardUser.numberOfWins} | Loose
			: {leaderboardUser.numberOfLosses} | WRR : {getWinRate(leaderboardUser)}
			<span class="absolute right-2">#{i + 1}</span>
		</div>
	{/each}
</Frame>
