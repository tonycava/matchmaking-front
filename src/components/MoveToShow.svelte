<script lang="ts">
  import type { Move } from '@models/Game';
  import IconHandBackFistSolid from '@components/icons/IconHandBackFistSolid.svelte';
  import IconHandSolid from '@components/icons/IconHandSolid.svelte';
  import IconScissorsSolid from '@components/icons/IconScissorsSolid.svelte';

  export let move: Move;
</script>

{#if move === 'rock'}
  <IconHandBackFistSolid color="#ffeba7" />
{:else if move === 'paper'}
  <IconHandSolid color="#ffeba7" />
{:else if move === 'scissors'}
  <IconScissorsSolid color="#ffeba7" />
{/if}