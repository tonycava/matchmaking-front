<script lang="ts">
	export let className = '';
</script>

<div class="bg-secondary text-primary p-2 rounded {className}">
	<slot />
</div>
