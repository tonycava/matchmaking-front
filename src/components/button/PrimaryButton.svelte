<script lang="ts">

	export let type: 'submit' | 'button' = 'button';
</script>


<button class="bg-secondary p-2 rounded p-3 w-fit mx-auto text-primary text-sm font-bold" on:click type={type}>
  <slot />
</button>
