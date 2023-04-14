<script lang="ts">
	import IconHandBackFistSolid from '@components/icons/IconHandBackFistSolid.svelte';
	import IconHandSolid from '@components/icons/IconHandSolid.svelte';
	import IconScissorsSolid from '@components/icons/IconScissorsSolid.svelte';
	import type { Move } from 'matchmaking-shared';

	export let move: Move | string;
</script>

{#if move === 'rock'}
	<IconHandBackFistSolid color="#ffeba7" />
{:else if move === 'paper'}
	<IconHandSolid color="#ffeba7" />
{:else if move === 'scissors'}
	<IconScissorsSolid color="#ffeba7" />
{/if}
