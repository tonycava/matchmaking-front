<script lang="ts">
	import type { PageServerData } from './$types';
	import FormActon from '@components/common/FormActon.svelte';
	import { INPUT } from '$lib/helpers/form.helper';
	import type { FormActionResponse } from '@models/Error';
	import { applyAction } from '$app/forms';

	let code = '';
	let isLoading = false;

	const handleSubmit = (): FormActionResponse => {
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);
			code = '';
			isLoading = false;

		};
	};

	export let data: PageServerData;
</script>

<div class="flex items-center mt-48 flex-col gap-4">
  <p class="text-secondary text-2xl text-center">Scan this QR code with your phone and enter the code below :</p>
  <div class="flex justify-center mt-4">
    <img src={data.url} alt="QR Code" />
  </div>
  <FormActon
    iconSrc="/icons/IconGearSolid.svg"
    textButton="Send code"
    placeholder="Code..."
    bind:value={code}
    name={INPUT.CODE}
    {handleSubmit}
  />
  {#if data.error === "invalid_code"}
    <p class="text-red-600 font-poppins-bold">Invalid code !</p>
  {/if}
</div>
