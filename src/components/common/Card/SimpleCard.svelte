<script lang="ts">
	export let text = 'Hello world';

	export let className = '';
</script>

<div class="bg-secondary text-primary p-2 rounded {className}">
	{text}
</div>
