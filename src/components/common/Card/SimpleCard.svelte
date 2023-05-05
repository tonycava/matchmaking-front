<script lang="ts">
	export let className = '';
</script>

<div
	class="font-poppins-medium relative mx-auto text-sm w-11/12 mt-4 bg-secondary p-2 rounded {className}"
>
	<slot />
</div>
