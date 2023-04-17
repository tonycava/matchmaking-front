<script lang="ts">
	export let type: 'submit' | 'button' = 'button';
	export let css = '';
	export let disabled = false;
</script>

<button
	class="bg-secondary rounded p-3 w-fit text-primary text-sm font-bold {css}"
	on:click
	{type}
	{disabled}
>
	<slot />
</button>
