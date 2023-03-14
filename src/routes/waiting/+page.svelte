<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		window.addEventListener("beforeunload", () => {
      console.log("Hello world");
    });
	});
</script>

<h1>Hello world</h1>