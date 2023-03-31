<script lang="ts">
	import type { LayoutServerData } from './$types';
	import EditableProfilePicture from '@components/EditableProfilePicture.svelte';

	let form: HTMLFormElement;

	export let data: LayoutServerData;
</script>

<div class="m-8 relative w-fit">

  <EditableProfilePicture userData={data.user} />
  <h2 class="text-secondary mt-4 text-center text-2xl font-poppins-medium">{data.user.username}</h2>
</div>
<slot />
