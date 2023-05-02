<script lang="ts">
	import Svg from '@components/layout/Svg.svelte';
	import { expoOut } from 'svelte/easing';

	export let src = '';
	export let size = 4;
	export let value = '';
	export let name = '';
	export let type: 'text' | 'password' = 'text';
	export let placeholder = '';

	export let autocomplete: 'on' | 'off' = 'on';
	export let autofocus = false;
	export let addClasses = '';

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;

		return {
			destroy() {
				node.type = 'text';
			}
		};
	};
</script>

<fieldset
	class="bg-primary flex p-2 rounded gap-4 justify-center [&>svg]:w-6 [&>svg]:h-6 {addClasses}"
>
	<Svg {src} {size} color="#ffeba7" className="my-auto" />
	<input
		class="bg-primary w-full text-secondary placeholder-gray-500 outline-0 h-10 p-1 rounded text-sm"
		{placeholder}
		{autofocus}
		{autocomplete}
		bind:value
		{name}
		use:typeAction
	/>
	<slot />
</fieldset>
