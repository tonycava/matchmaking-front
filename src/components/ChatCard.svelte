<script lang="ts">
	import { inview } from 'svelte-inview';
	import { user } from '$lib/stores/user.stores.js';
	import type { Chat } from '@models/Chat';

	export let isLast: boolean;
	export let chat: Chat;
	export let getMore: () => void;
</script>

{#if isLast}
  <li
    use:inview={{}}
    on:enter={getMore}
    class='break-words bg-red-500 text-white w-[calc(50%-.75rem)] mt-2 {chat.userId === $user.id ? "ml-auto mr-2" : "ml-2"}'
  >
    {chat.content}
  </li>
{:else if (chat.userId === $user?.id)}
  <li class='break-words bg-red-500 text-white w-[calc(50%-.75rem)] mt-2 mr-2 ml-auto'>
    {chat.content}
  </li>
{:else}
  <li class='break-words bg-blue-500 text-white w-[calc(50%-.75rem)] mt-2 ml-2 '>
    {chat.content}
  </li>
{/if}