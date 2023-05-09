<script lang="ts">
	import socket from '$lib/socket';
	import { user } from '@stores/user.store';
	import Cookies from 'js-cookie';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import { goto } from '$app/navigation';
	import ChatCard from '@components/common/Card/ChatCard.svelte';
	import ChatService from '@services/chat.service';
	import Frame from '@components/layout/Frame.svelte';
	import { applyAction } from '$app/forms';
	import type { FormActionResponse } from '@models/Error';
	import Svg from '@components/layout/Svg.svelte';
	import type { PageServerData } from './$types';
	import type { Chat, Range } from 'matchmaking-shared';
	import { WEB_SOCKET_EVENT } from 'matchmaking-shared';
	import { COOKEYS } from '$lib/helpers/cookie.helper';
	import { disconnect } from '$lib/helpers/auth.helper';
	import { INPUT } from '$lib/helpers/form.helper';
	import FormActon from '@components/common/FormActon.svelte';
	import SimpleCard from '@components/common/Card/SimpleCard.svelte';
	import { getWinRateRation } from '$lib/utils';

	let message = '';
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
		data.chats = [chat, ...data.chats];
	});

	const getMoreChat = async () => {
		if (!haveMoreChat) return;
		range = { start: range.end, end: range.end + RATIO };

		try {
			const jwtToken = Cookies.get(COOKEYS.JWT_TOKEN) ?? '';
			const response = await ChatService.getChats(jwtToken, range);
			if (
				response.data.data.messages.length === 0 ||
				response.data.data.messages.length < RATIO - 1
			)
				haveMoreChat = false;
			data.chats = [...data.chats, ...response.data.data.messages];
		} catch (e) {
			await disconnect();
		}
	};

	const randomNumber = Math.floor(Math.random() * 1000);
	const MEL_NUMBER = 6;
</script>

<div class="text-secondary flex justify-between font-poppins-medium m-4 gap-8 text-2xl">
	<span class="flex-1">Welcome to ALM-Matcher {$user?.username}</span>
	<PrimaryButton css="h-fit" on:click={() => goto('/direct')}>
		<Svg size={5} src="/icons/IconPaperPlaneSolid.svg" />
	</PrimaryButton>
	<PrimaryButton id="profileButton" css="h-fit" on:click={() => goto('/profile')}>
		<Svg size={5} src="/icons/IconUserSolid.svg" />
	</PrimaryButton>
	<PrimaryButton css="h-fit" on:click={disconnect}>Logout</PrimaryButton>
</div>

<div
	class="flex flex-1 h-screen justify-center items-start mt-10 [&>button]:text-3xl xl:items-center"
>
	<PrimaryButton id="waitingButton" on:click={() => goto('/waiting')}
		>Join the waiting room</PrimaryButton
	>
</div>

<div class="flex gap-4 flex-col justify-center">
	<Frame css="block relative md:w-96 w-full m-2" bottom={true} right={true} isReversed={true}>
		{#each data.chats as chat, i (chat.id)}
			<ChatCard isLast={i === data.chats.length - 1} {chat} {getMoreChat} />
		{/each}
		<FormActon name={INPUT.MESSAGE} bind:value={message} handleSubmit={handleSendMessage} />
	</Frame>

	<Frame ulCss="h-full" css="block relative md:w-96 w-full m-2" bottom={true} left={true}>
		{#each data.leaderboard as leaderboardUser, i}
			<SimpleCard>
				<b class="font-bold">{leaderboardUser.username}</b> | Win : {leaderboardUser.numberOfWins} |
				Loose : {leaderboardUser.numberOfLosses} | WRR : {getWinRateRation(
					leaderboardUser.numberOfWins,
					leaderboardUser.numberOfLosses
				)}
				<span class="absolute right-2">#{i + 1}</span>
			</SimpleCard>
		{/each}
	</Frame>
</div>

{#if randomNumber === MEL_NUMBER}
	<div class="fixed top-1/2 -translate-y-3/4 right-0 m-4 rotate-3 flex flex-col gap-2">
		<Svg className="mx-auto" src="/icons/IconBookSolid.svg" color="#ffeba7" size={16} />
		<span class="text-secondary text-lg font-poppins-medium"
			>You actually have 1 chance out of 1000 to see this !</span
		>
	</div>
{/if}
