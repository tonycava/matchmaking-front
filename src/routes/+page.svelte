<script lang="ts">
	import socket from '$lib/webSocketClient';
	import { user } from '@stores/user.store';
	import Cookies from 'js-cookie';
	import { COOKEYS, disconnect, getWinRateRation, INPUT, WEB_SOCKET_EVENT } from '$lib/utils';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import { goto } from '$app/navigation';
	import ChatCard from '@components/ChatCard.svelte';
	import ChatService from '@services/chat.service';
	import Frame from '@components/layout/Frame.svelte';
	import InputFieldset from '@components/form/InputFieldset.svelte';
	import { applyAction, enhance } from '$app/forms';
	import type { FormActionResponse } from '@models/Error';
	import Svg from '@components/layout/Svg.svelte';
	import type { PageServerData } from './$types';
	import type { Chat, Range } from 'matchmaking-shared';

	let message = '';
	let chats: Chat[] = [];
	let haveMoreChat = true;

	export let data: PageServerData;

	const RATIO = 11;
	let range: Range = { start: 0, end: RATIO };

	const handleSendMessage = (): FormActionResponse => {
		return async ({ result }) => {
			await applyAction(result);
			message = '';
		};
	};

	socket.on(WEB_SOCKET_EVENT.NEW_MESSAGE, (chat: Chat) => {
		chats = [chat, ...chats];
	});

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

	$: chats = data.chats;

	const randomNumber = Math.floor(Math.random() * 1000);
	const MEL_NUMBER = 6;
</script>

<div class="text-secondary flex justify-between font-poppins-medium m-4 gap-8 text-2xl">
  <span class="flex-1">Welcome to ALM-Matcher {$user?.username}</span>
  <PrimaryButton css="h-fit" id="profileButton" on:click={() => goto('/profile')}>
    <Svg size={6} src="/icons/IconUserSolid.svg" />
  </PrimaryButton>
  <PrimaryButton css="h-fit" on:click={disconnect}>Logout</PrimaryButton>
</div>

<div
  class="flex flex-1 h-screen justify-center items-start mt-10 [&>button]:text-3xl xl:items-center"
>
  <PrimaryButton id='waitingButton' on:click={() => goto('/waiting')}>Join the waiting room</PrimaryButton>
</div>

<div class="flex gap-4 flex-col justify-center">
  <Frame css="block relative md:w-96 w-full m-2" bottom={true} right={true} isReversed={true}>
    {#each chats as chat, i}
      <ChatCard isLast={i === chats.length - 1} {chat} {getMore} />
    {/each}
    <form
      method="POST"
      use:enhance={handleSendMessage}
      class="flex absolute bottom-0 gap-2 m-1 w-full"
    >
      <div class="flex w-full gap-2">
        <InputFieldset
          placeholder="Message"
          addClasses="w-[calc(100%-9rem)]"
          name={INPUT.MESSAGE}
          size={8}
          bind:value={message}
          src="/icons/IconMessageSolid.svg"
        />
        <PrimaryButton type="submit" id="messageButton">Send message</PrimaryButton>
      </div>
    </form>
  </Frame>

  <Frame css="block relative md:w-96 w-full m-2" bottom={true} left={true}>
    {#each data.leaderboard as leaderboardUser, i}
      <div
        class="font-poppins-medium relative mx-auto text-sm w-11/12 mt-4 bg-secondary p-2 rounded"
      >
        <b class="font-bold">{leaderboardUser.username}</b> | Win : {leaderboardUser.numberOfWins} |
        Loose : {leaderboardUser.numberOfLosses} | WRR : {getWinRateRation(
        leaderboardUser.numberOfWins,
        leaderboardUser.numberOfLosses
      )}
        <span class="absolute right-2">#{i + 1}</span>
      </div>
    {/each}
  </Frame>
</div>

{#if randomNumber === MEL_NUMBER}
  <div class="fixed top-1/2 -translate-y-3/4 right-0 m-4 rotate-3 flex flex-col gap-2">
    <Svg className="mx-auto" src="/icons/IconBookSolid.svg" color="#ffeba7" size={16} />
    <span class="text-secondary text-lg font-poppins-medium">You actually have 1 chance out of 1000 to see this !</span>
  </div>
{/if}