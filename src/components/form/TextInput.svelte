<script lang="ts">
	export let name: string;
	export let label: string;

	export let type = 'text';
	export let autocomplete = 'off';
	export let value = '';
	export let css = '';
	export let spellcheck = true;

	export let tabindex = 0;

	let focused = false;
	let movingLabelPosition: string;
	$: movingLabelPosition =
		focused || value
			? 'top: 50%; transform: translateY(-150%) scale(0.75);'
			: 'top: 50%; transform: translateY(-50%)';

	const focusIn = () => (focused = true);
	const focusOut = () => (focused = false);
	const setType = (node: HTMLInputElement) => (node.type = type);

</script>

<div class="relative w-full {css}">
  <input
    {autocomplete}
    bind:value
    class="py-2 px-4 focus-visible:outline-primary border rounded-md w-full text-sm"
    {name}
    on:focusin={focusIn}
    on:focusout={focusOut}
    on:keypress
    {spellcheck}
    {tabindex}
    use:setType
  />
  <p
    class="absolute left-2 text-sm transition-transform duration-200 px-2 text-gray-600"
    class:bg-white={focused || value}
    style={movingLabelPosition}
  >
    {label}
  </p>
</div>