<script lang="ts">
	import type { LayoutServerData } from './$types';
	import EditableProfilePicture from '@components/EditableProfilePicture.svelte';
	import Frame from '@components/layout/Frame.svelte';
	import ChatCard from '@components/ChatCard.svelte';

	export let data: LayoutServerData;
</script>

<div class="flex m-8">
  <div class="relative w-fit">
    <EditableProfilePicture userData={data.user} />
    <h2 class="text-secondary mt-4 text-center text-2xl font-poppins-medium">{data.user.username}</h2>
  </div>
  <div class="flex flex-col ml-10">
  <span class="text-secondary text-lg flex-1 font-poppins-regular">Number of wins : <b>0</b></span>
  <span class="text-secondary text-lg flex-1 font-poppins-regular">Number of looses : <b>0</b></span>
  <span class="text-secondary text-lg flex-1 font-poppins-regular">Win Rate Ratio : <b>0</b></span>
  </div>
</div>

<Frame ulCss="h-full" bottom={true} right={true}>
  {#if data.chats.length > 0}
    {#each data.chats as chat}
      <ChatCard chat={chat} isLast={false} />
    {/each}
  {:else}
    <h2 class="flex justify-center items-center text-2xl text-secondary h-full">No chats !</h2>
  {/if}
</Frame>
<slot />
