<script lang="ts">
	import { inview } from 'svelte-inview';
	import type { Chat } from '@models/Chat';
	import { user } from '@stores/user.store.js';

	export let isLast: boolean;
	export let chat: Chat;
	export let getMore: () => void;
</script>

{#if (isLast)}
  <li
    use:inview={{}}
    on:enter={getMore}
    class='break-words rounded w-[calc(50%-.75rem)] mt-2 p-1 {chat.userId === $user?.id ? "ml-auto mr-2 bg-secondary text-black" : "ml-2 bg-[#84743e]"}'
  >
    <span class="text-sm font-poppins-regular">{chat.user.username} : <br></span>
    <p class="font-poppins-medium">{chat.content}</p>
  </li>
{:else if (chat.userId === $user?.id)}
  <li class='break-words rounded bg-secondary text-black p-1 w-[calc(50%-.75rem)] mt-2 mr-2 ml-auto'>
    <span class="text-sm font-poppins-regular">{chat.user.username} : <br></span>
    <p class="font-poppins-medium">{chat.content}</p>
  </li>
{:else}
  <li class='break-words rounded bg-[#84743e] text-black p-1 w-[calc(50%-.75rem)] mt-2 ml-2 '>
    <span class="text-sm font-poppins-regular">{chat.user.username} : <br></span>
    <p class="font-poppins-medium">{chat.content}</p>
  </li>
{/if}