<script lang="ts">
	import type { LayoutServerData } from './$types';
	import Frame from '@components/layout/Frame.svelte';
	import ChatCard from '@components/common/Card/ChatCard.svelte';
	import { formatDate, getWinRateRation } from '$lib/utils';
	import GoBack from '@components/common/GoBack.svelte';
	import EditableProfilePicture from '@components/layout/EditableProfilePicture.svelte';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import InformationGroup from '@components/layout/InformationGroup.svelte';
	import { user } from '@stores/user.store';
	import { page } from '$app/stores';
	import UserService from '@services/user.service';
	import { COOKEYS } from '$lib/helpers/cookie.helper';
	import Cookies from 'js-cookie';
	import { disconnect } from '$lib/helpers/auth.helper';
	import socket from '$lib/socket';
	import Sidebar from '@components/common/Sidebar.svelte';
	import type { Game } from '@models/User';
	import SimpleCard from '@components/common/Card/SimpleCard.svelte';
	import SidebarButton from '@components/button/SidebarButton.svelte';

	export let data: LayoutServerData;
	const needToShowFollowButton = $page.url.pathname === '/profile' || $page.params.userId === $user?.id;

	let isWinListSidebarOpen = false;
	let isAddedUserSidebarOpen = false;
	let text = data.user.followers.find(follower => follower.followerId === $user?.id) ? 'Unfollow' : 'Follow';

	socket.on(`user/${data.user.id}`, (newGame: Game) => {
		newGame.result = newGame.result === data.user.id ? 'win' : 'loose';
		data.user.games = [newGame, ...data.user.games];
	});

	const followOrUnfollow = async (type: string) => {
		const jwtToken = Cookies.get(COOKEYS.JWT_TOKEN) ?? '';
		try {
			const response = await UserService[`${type}User`](jwtToken, $page.params.userId);

			data.user.followers = type === 'follow' ?
				[...data.user.followers, response.data.data[type]] :
				data.user.followers.filter(follower => follower.followerId !== $user?.id);
			text = type === 'follow' ? 'Unfollow' : 'Follow';
		} catch (e) {
			await disconnect();
		}
	};
</script>

<GoBack href="/" size={10} className="absolute m-6" />

{#if isWinListSidebarOpen}
  <Sidebar srcIcon="/icons/IconGamePad.svg" bind:isSideBarOpen={isWinListSidebarOpen}>
    <div class="flex gap-4 flex-col w-full overflow-y-auto h-full mt-10">
      {#each data.user.games as game}
        <SimpleCard text={`${data.user.username} just ${game.result} ${formatDate(new Date(game.createdAt))}`}
                    className="w-[90%] mx-auto" />
      {/each}
    </div>
  </Sidebar>
{/if}

{#if isAddedUserSidebarOpen}
  <Sidebar bind:isSideBarOpen={isAddedUserSidebarOpen}>
    Hello world
  </Sidebar>
{/if}

<div class="flex m-8 ml-24 mt-16 relative">
  <div class="relative">
    <div class="min-w-max">
      <EditableProfilePicture userData={data.user} />
    </div>
    <div class="absolute left-1/2 -translate-x-1/2">
      <h2 class="text-secondary mt-4 text-2xl font-poppins-medium">{data.user.username}</h2>
      {#if !needToShowFollowButton}
        <PrimaryButton on:click={(e) => followOrUnfollow(e.srcElement.innerHTML.toLowerCase())}
                       css="mt-4">{text}</PrimaryButton>
      {/if}
    </div>
  </div>
  <div class="flex ml-20 w-full justify-between relative">
    <InformationGroup informations={[
        `Number of wins :&nbsp<b>${data.user.numberOfWins}</b>`,
        `Number of looses :&nbsp<b>${data.user.numberOfLoses}</b>`,
        `Win Rate Ratio :&nbsp<b>${getWinRateRation(data.user.numberOfWins, data.user.numberOfLoses)}</b>`,
        ]} />
    <InformationGroup informations={[
        `Created :&nbsp<b>${formatDate(new Date(data.user.createdAt))}</b>`,
        `Number of follower :&nbsp<b>${data.user.followers.length}</b>`,
        `Number of following :&nbsp<b>${data.user.followedCount}`,
        ]} />
  </div>

  <SidebarButton bind:toggle={isWinListSidebarOpen} iconSrc="/icons/IconGamePadSolid.svg" />
  <SidebarButton className="-bottom-48" bind:toggle={isAddedUserSidebarOpen} iconSrc="/icons/IconUsersSolid.svg" />
</div>

<Frame ulCss="h-full lg:m-0" bottom={true} right={true}>
  {#if data.chats.length > 0}
    {#each data.chats as chat}
      <ChatCard addClasses="!w-[95%] mx-auto" {chat} isLast={false} getMore={() => undefined} />
    {/each}
  {:else}
    <h2 class="flex justify-center items-center text-2xl text-secondary h-full">No chats !</h2>
  {/if}
</Frame>
<slot />