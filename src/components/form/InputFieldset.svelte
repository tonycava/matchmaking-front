<script lang="ts">
	import Svg from '@components/layout/Svg.svelte';

	export let src = '';
	export let size = 4;
	export let type: 'text' | 'password' = 'text';
	export let value = '';
	export let name = '';
	export let placeholder = '';

	const typeAction = (node) => (node.type = type);
</script>

<fieldset class='bg-primary mx-auto flex p-2 rounded gap-4 justify-center [&>svg]:w-6 [&>svg]:h-6'>
	<Svg src={src} size={size} color='#ffeba7' className='my-auto' />
	<input class='bg-primary text-secondary placeholder-gray-500 outline-0 h-10 p-1 w-48 rounded text-sm'
				 {placeholder}
				 bind:value
				 {name}
				 use:typeAction
	/>
</fieldset>