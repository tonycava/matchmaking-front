<script lang="ts">
	import type { LayoutServerData } from './$types';
	import Frame from '@components/layout/Frame.svelte';
	import ChatCard from '@components/common/Card/ChatCard.svelte';
	import { getWinRateRation } from '$lib/utils';
	import GoBack from '@components/common/GoBack.svelte';
	import EditableProfilePicture from '@components/layout/EditableProfilePicture.svelte';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import InformationGroup from '@components/layout/InformationGroup.svelte';
	import { user } from '@stores/user.store';
	import { page } from '$app/stores';
	import { COOKEYS } from '$lib/helpers/cookie.helper';
	import Cookies from 'js-cookie';
	import { disconnect } from '$lib/helpers/auth.helper';
	import socket from '$lib/socket';
	import type { Follow, Game, UserDemand } from '@models/User';
	import SidebarButton from '@components/button/SidebarButton.svelte';
	import WinListOptionSidebar from './WinListOptionSidebar.svelte';
	import AddedUsersOptionSidebar from './AddedUsersOptionSidebar.svelte';
	import SettingsOptionSidebar from './SettingsOptionSidebar.svelte';
	import PrivateModal from '@components/common/PrivateModal.svelte';
	import SocialService from '@services/social.service';
	import { goto } from '$app/navigation';
	import { getRelativeTime } from '$lib/date.utils';
	import Svg from '@components/layout/Svg.svelte';

	export let data: LayoutServerData;
	const isMyProfilePage = $page.url.pathname === '/profile' || $page.params?.userId === $user?.id;
	let haveAccessToThis = !data.user.isAccountPrivate || isMyProfilePage || data.user.haveAccess;

	let isWinListSidebarOpen = false;
	let isAddedUserSidebarOpen = false;
	let isSettingsOpen = false;
	let text = data.user.followers.find((follower) => follower.followedId === $user?.id)
		? 'Unfollow'
		: 'Follow';
	if (data.user.isAlreadyApplicating) text = 'Waiting';

	socket.on(`user/demand/${data.user.id}`, (demand: { id: string; userToFollow: UserDemand }) => {
		data.user.whoFollow = [...data.user.whoFollow, demand];
	});

	socket.on(`user/demand/accept/${data.user.id}/${$user?.id}`, () => {
		text = 'Unfollow';
		haveAccessToThis = true;
	});

	socket.on(`user/demand/accept/${data.user.id}/${$user?.id}`, () => {
		text = 'Unfollow';
		haveAccessToThis = true;
	});

	socket.on(`user/demand/reject/${data.user.id}/${$user?.id}`, () => {
		text = 'Follow';
	});

	socket.on(`user/demand/remove/${data.user.id}`, (demandId: string) => {
		data.user.whoFollow = data.user.whoFollow.filter((demand) => demand.id !== demandId);
	});

	socket.on(`user/new-follow/${data.user.id}`, (follower: Follow) => {
		data.user.followers = [...data.user.followers, follower];
	});

	socket.on(`user/remove-follow/${data.user.id}`, (followerId: string) => {
		data.user.followers = data.user.followers.filter((f) => f.followedId !== followerId);
	});

	socket.on(`user/${data.user.id}`, (newGame: Game) => {
		newGame.result = newGame.result === data.user.id ? 'win' : 'loose';
		data.user.games = [newGame, ...data.user.games];
	});

	const followOrUnfollow = async (event: any) => {
		const jwtToken = Cookies.get(COOKEYS.JWT_TOKEN) ?? '';
		const type: 'waiting' | 'follow' | 'unfollow' = event.srcElement.innerHTML.toLowerCase();

		if (type === 'waiting') {
			await SocialService.removeWaitingApplication(jwtToken, $page.params.userId);
			text = 'Follow';
			return;
		}

		if (type === 'follow' && data.user.isAccountPrivate) {
			const response = await SocialService.addApplication(jwtToken, $page.params.userId).catch(() =>
				Promise.resolve('')
			);
			if (!response) await disconnect();
			text = 'Waiting';
			return;
		}

		let response;

		if (type === 'follow')
			response = await SocialService.followUser(jwtToken, $page.params.userId).catch(() =>
				Promise.resolve('')
			);
		else
			response = await SocialService.unfollowUser(jwtToken, $page.params.userId).catch(() =>
				Promise.resolve('')
			);

		if (typeof response === 'string') {
			await disconnect();
			return;
		}

		data.user.followers =
			type === 'follow'
				? [...data.user.followers, response.data.data[type as keyof typeof response.data.data]]
				: data.user.followers.filter((follower) => follower.followedId !== $user?.id);

		text =
			type === 'follow' && data.user.isAccountPrivate
				? 'Waiting'
				: type === 'follow'
				? 'Unfollow'
				: 'Follow';
		if (data.user.isAccountPrivate) haveAccessToThis = false;
	};
</script>

<GoBack href="/" size={10} className="absolute m-6" />

{#if isWinListSidebarOpen}
	<WinListOptionSidebar {data} bind:isSideBarOpen={isWinListSidebarOpen} />
{/if}

{#if isAddedUserSidebarOpen}
	<AddedUsersOptionSidebar {data} bind:isSideBarOpen={isAddedUserSidebarOpen} />
{/if}

{#if isSettingsOpen}
	<SettingsOptionSidebar {data} bind:isSideBarOpen={isSettingsOpen} />
{/if}

{#if !haveAccessToThis && data.user.isAccountPrivate}
	<PrivateModal />
{/if}

<div class="flex m-8 ml-24 mt-16 relative">
	<div class="relative">
		<div class="min-w-max">
			<EditableProfilePicture needToSowEdit={isMyProfilePage} userData={data.user} />
		</div>
		<div class="absolute left-1/2 -translate-x-1/2">
			<h2 class="text-secondary mt-4 text-center text-2xl font-poppins-medium">
				{data.user.username}
			</h2>
			{#if data.user.role === 'ADMIN'}
				<h2 class="text-secondary text-center text-sm font-poppins-medium underline mt-2">
					Administrator
				</h2>
			{/if}
			<div class="flex gap-2">
				{#if !isMyProfilePage}
					<PrimaryButton on:click={followOrUnfollow} css="mt-4">{text}</PrimaryButton>
				{/if}
				{#if !isMyProfilePage && haveAccessToThis}
					<PrimaryButton on:click={() => goto(`/direct/${data.user.id}`)} css="mt-4">
						<Svg src="/icons/IconMessageSolid.svg" size={5} className="my-auto" />
					</PrimaryButton>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex ml-20 w-full justify-between">
		{#if haveAccessToThis}
			<InformationGroup
				informations={[
					`Number of wins :&nbsp<b>${data.user.numberOfWins}</b>`,
					`Number of looses :&nbsp<b>${data.user.numberOfLoses}</b>`,
					`Win Rate Ratio :&nbsp<b>${getWinRateRation(
						data.user.numberOfWins,
						data.user.numberOfLoses
					)}</b>`
				]}
			/>
		{/if}
		<InformationGroup
			informations={[
				`Created :&nbsp<b>${getRelativeTime(new Date(data.user.createdAt))}</b>`,
				`Number of follower :&nbsp<b>${data.user.followers.length}</b>`,
				`Number of following :&nbsp<b>${data.user.followedCount}`
			]}
		/>
	</div>

	{#if haveAccessToThis}
		<SidebarButton bind:toggle={isWinListSidebarOpen} iconSrc="/icons/IconGamePadSolid.svg" />
	{/if}
	{#if isMyProfilePage}
		<SidebarButton
			className="-bottom-48"
			bind:toggle={isAddedUserSidebarOpen}
			iconSrc="/icons/IconUsersSolid.svg"
		/>
		<SidebarButton
			className="-bottom-72"
			bind:toggle={isSettingsOpen}
			iconSrc="/icons/IconGearSolid.svg"
		/>
	{/if}
</div>

{#if haveAccessToThis}
	<Frame ulCss="h-full lg:m-0" bottom={true} left={true}>
		{#if data.chats.length > 0}
			{#each data.chats as chat}
				<ChatCard addClasses="!w-[95%] mx-auto" {chat} isLast={false} />
			{/each}
		{:else}
			<span class="m-auto text-2xl text-secondary">No chats !</span>
		{/if}
	</Frame>
{/if}

<slot />