<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Loading from '@components/common/Loading.svelte';
	import InputFieldset from '@components/form/InputFieldset.svelte';
	import { INPUT } from '$lib/utils';
	import type { FormActionResponse } from '@models/Error';

	let isLoading = true;
	export let data;

	const handleSubmit = (): FormActionResponse => {
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);
			isLoading = false;
		};
	};
</script>

{#if isLoading}
	<Loading absolute />
{/if}

<div class="flex justify-center items-center h-screen flex-col gap-16 -mt-8">
	<span
		class="relative flex justify-center items-end text-2xl font-poppins-bolds text-center text-secondary
    before:-bottom-3 before:absolute before:content-[''] before:w-32 before:h-1 before:bg-secondary"
		>{data.title}</span
	>

	<form
		action={`?/${data.title.toLowerCase()}`}
		class="bg-cover bg-[url('/3dcube.jpg')] text-secondary flex flex-col w-96 gap-4 pt-10 pb-6"
		enctype="multipart/form-data"
		method="POST"
		use:enhance={handleSubmit}
	>
		<InputFieldset
			placeholder="Username"
			name={INPUT.USERNAME}
			size={6}
			src="/icons/IconUserSolid.svg"
		/>
		<InputFieldset
			type="password"
			placeholder="Password"
			name={INPUT.PASSWORD}
			size={6}
			src="/icons/IconLockSolid.svg"
		/>
		<slot />
	</form>
</div>
