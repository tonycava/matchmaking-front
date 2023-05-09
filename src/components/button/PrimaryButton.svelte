<script lang="ts">
	export let type: 'submit' | 'button' = 'button';
	export let css = '';
	export let disabled = false;

	export let ariaLabel = '';
	export let id = '';
</script>

<button
	class="bg-secondary rounded p-3 w-fit text-primary text-sm font-bold {css}"
	{id}
	on:click
	{type}
	aria-label={ariaLabel}
	{disabled}
>
	<slot />
</button>
