<script lang="ts">
	import Svg from '@components/layout/Svg.svelte';

	export let toggle: boolean;
  export let iconSrc: string;
	export let className = "";
</script>

<div on:click={() => toggle = !toggle}
     class="absolute -right-8 -bottom-24 border-secondary border-4 border-r-0 {className}">
  <Svg size={12} src={iconSrc} color="#ffeba7" className="p-1" />
</div>