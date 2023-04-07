<script lang="ts">
	import { user } from '@stores/user.store.js';
	import { page } from '$app/stores';
	import { INPUT } from '$lib/utils.js';
	import Svg from '@components/layout/Svg.svelte';
	import type { FormActionResponse } from '@models/Error.js';
	import { applyAction, enhance } from '$app/forms';
	import type { User } from '@models/User';

	let form: HTMLFormElement;
	const handleFileUpload = (): FormActionResponse => {
		return async ({ result }) => {
			await applyAction(result);
		};
	};

	export let userData: User & { numberOfWins: number; numberOfLoses: number; };
</script>

<img
  class="w-40 h-40 object-cover rounded-full"
  src={userData.profilePicture ? `data:image/png;base64,${userData.profilePicture}` : "/default.png"}
  alt="user icon"
/>
{#if userData.id === $user?.id && userData.id === ($page.params.userId ?? $user?.id)}
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