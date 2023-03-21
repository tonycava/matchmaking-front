<script lang="ts">
	import type { Some } from '@models/Game';
	import { user } from '@stores/user.store.js';

	export let scores: [Some, Some, Some];
</script>


<div class="text-3xl text-secondary flex m-4 relative gap-4">Score :
  <div class="flex gap-4">
    {#each scores as score}
      {#if score === null}
        <div class="w-8 h-8 rounded-full my-auto bg-gray-700 text-center text-sm"></div>
      {:else if $user?.id === score}
        <div class="w-8 h-8 rounded-full my-auto bg-green-700 text-center text-sm"></div>
      {:else}
        <div class="w-8 h-8 rounded-full my-auto bg-red-700 text-center text-sm"></div>
      {/if}
    {/each}
  </div>
</div>
