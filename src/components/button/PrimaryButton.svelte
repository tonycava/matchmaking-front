<script lang="ts">
	export let type: 'submit' | 'button' = 'button';
	export let css = '';
	export let disabled = false;
</script>


<button class="bg-secondary p-2 rounded p-3 w-fit mx-auto text-primary text-sm font-bold {css}" on:click {type} {disabled}>
  <slot />
</button>
