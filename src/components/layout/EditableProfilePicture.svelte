<script lang="ts">
	import Svg from '@components/layout/Svg.svelte';
	import type { FormActionResponse } from '@models/Error.js';
	import { applyAction, enhance } from '$app/forms';
	import type { UserInformation } from '@models/User';
	import { INPUT } from '$lib/helpers/form.helper';
	import { page } from '$app/stores';

	let buttonElement: HTMLButtonElement;
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
  {#if $page.form?.internalError}
    <span class="text-red-500 font-poppins-bold absolute whitespace-nowrap -translate-x-1/2 w-48 text-center">{$page.form?.internalError}</span>
  {/if}
  <form
    use:enhance={handleFileUpload}
    action="?/uploadProfilePicture"
    enctype="multipart/form-data"
    method="POST"
  >
    <label
      for="file-upload"
      class="absolute top-0 -right-3 bg-secondary p-3 rounded-full cursor-pointer"
    >
      <Svg src="/icons/IconPenSolid.svg" size={6} />
    </label>
    <input
      accept="image/jpeg,image/png"
      id="file-upload"
      on:input={() => buttonElement.click()}
      name={INPUT.PROFILE_PICTURE}
      type="file"
      hidden
    />
    <button bind:this={buttonElement} type="submit" hidden></button>
  </form>
{/if}
