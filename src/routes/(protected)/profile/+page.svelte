<script lang="ts">
	import Profile from '@components/layout/Profile.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<Profile user={data.user} />
