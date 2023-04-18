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

	export let data: LayoutServerData;

	const since = formatDate(new Date(data.user.createdAt));
	let text = data.user.followers.find(follower => follower.followerId === $user?.id) ? 'Unfollow' : 'Follow';

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

<div class="absolute m-6">
  <GoBack href="/" size={10} />
</div>

<div class="flex m-8 ml-24 mt-16">
  <div class="relative">
    <div class="min-w-max">
      <EditableProfilePicture userData={data.user} />
    </div>
    <div class="absolute left-1/2 -translate-x-1/2">
      <h2 class="text-secondary mt-4 text-2xl font-poppins-medium">{data.user.username}</h2>

      {#if !($page.url.pathname === "/profile" || $page.params.userId === $user?.id)}
        <form method="POST" enctype="multipart/form-data" action="?/">
          <PrimaryButton on:click={(e) => followOrUnfollow(e.srcElement.innerHTML.toLowerCase())} css="mt-4">
            {text}
          </PrimaryButton>
        </form>
      {/if}
    </div>
  </div>
  <div class="flex ml-20 w-full justify-between">
    <InformationGroup informations={[
        `Number of wins :&nbsp<b>${data.user.numberOfWins}</b>`,
        `Number of looses :&nbsp<b>${data.user.numberOfLoses}</b>`,
        `Win Rate Ratio :&nbsp<b>${getWinRateRation(data.user.numberOfWins, data.user.numberOfLoses)}</b>`,
        ]} />
    <InformationGroup informations={[
        `Created :&nbsp<b>${since}</b>`,
        `Number of follower :&nbsp<b>${data.user.followers.length}</b>`,
        `Number of following :&nbsp<b>${data.user.followedCount}`,
        ]} />
  </div>
</div>

<Frame ulCss="h-full lg:m-0 my:auto" bottom={true} right={true}>
  {#if data.chats.length > 0}
    {#each data.chats as chat}
      <ChatCard addClasses="!w-[95%] mx-auto" {chat} isLast={false} getMore={() => undefined} />
    {/each}
  {:else}
    <h2 class="flex justify-center items-center text-2xl text-secondary h-full">No chats !</h2>
  {/if}
</Frame>
<slot />