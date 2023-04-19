<script lang="ts">
	import { user } from '@stores/user.store.js';
	import { page } from '$app/stores';
	import Svg from '@components/layout/Svg.svelte';
	import type { FormActionResponse } from '@models/Error.js';
	import { applyAction, enhance } from '$app/forms';
	import type { UserInformation } from '@models/User';
	import { INPUT } from '$lib/helpers/form.helper';

	let form: HTMLFormElement;
	const handleFileUpload = (): FormActionResponse => {
		return async ({ result }) => {
			await applyAction(result);
		};
	};

	export let userData: UserInformation;
	export let needToSowEdit: boolean;
</script>

<img
  class="w-40 h-40 object-cover rounded-full border-secondary border-2 p-2"
  src={userData.profilePicture
		? `data:image/png;base64,${userData.profilePicture}`
		: '/default.png'}
  alt="user icon"
/>
{#if needToSowEdit}
  <form
    bind:this={form}
    use:enhance={handleFileUpload}
    action="?/uploadProfilePicture"
    method="POST"
    enctype="multipart/form-data"
  >
    <label for="file-upload" class="absolute top-0 -right-3 bg-secondary p-3 rounded-full">
      <Svg src="/icons/IconPenSolid.svg" size={6} />
    </label>
    <input
      accept="image/*"
      on:change={() => form.submit()}
      id="file-upload"
      name={INPUT.PROFILE_PICTURE}
      type="file"
      hidden
    />
  </form>
{/if}
