<script lang="ts">
	export let bottom = false;
	export let top = false;
	export let right = false;
	export let left = false;
	export let isReversed = false;
	export let css = '';
	export let ulCss = '';
</script>

<div
	class="fixed w-96 h-96 border border-secondary {bottom ? 'bottom-0' : ''} {right
		? 'right-0'
		: ''} {left ? 'left-0' : ''} {top ? 'top-0' : ''} {css}"
>
	<ul
		class="ti-anchor h-3/4 w-full overflow-y-auto flex flex-col {isReversed &&
			'flex-col-reverse'} {ulCss}"
	>
		<slot />
	</ul>
</div>
