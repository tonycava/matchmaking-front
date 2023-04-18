<script lang="ts">
	import Svg from '@components/layout/Svg.svelte';
	export let href: string;
	export let size = 6;
</script>

<a {href}>
	<Svg src="/icons/IconArrowLeftSolid.svg" {size} color="#ffeba7" />
</a>
