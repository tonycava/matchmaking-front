<script lang="ts">
	export let className = '';
</script>

<li
	class="font-poppins-medium relative mx-auto text-sm w-11/12 mt-4 bg-secondary text-primary list-none p-2 rounded {className}"
>
	<slot />
</li>
