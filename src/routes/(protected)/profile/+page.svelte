<script lang="ts">
	import { user } from '@stores/user.store.js';
	import { INPUT } from '$lib/utils.js';
	import { applyAction, enhance } from '$app/forms';
	import type { FormActionResponse } from '@models/Error';
	import type { ActionData } from './$types';

	let profilePicture: FileList;
	export let form: ActionData;


	const handleFile = (): FormActionResponse => {
		return async ({ result }) => {
			await applyAction(result);
		};
	};
</script>

<h1>{$user?.username}</h1>

<form
	use:enhance={handleFile}
	action="?/uploadProfilePicture"
	method="POST"
	enctype="multipart/form-data"
>
	<input
		name={INPUT.PROFILE_PICTURE}
		bind:files={profilePicture}
		type="file"
		class="text-secondary"
	/>

	{#if profilePicture[0]?.name}
		{profilePicture[0].name}
	{/if}

	<button type="submit" class="text-secondary">Submit</button>
	<span class="text-secondary">{form?.message}</span>
</form>
