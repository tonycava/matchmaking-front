<script lang="ts">
	import type { PageServerData } from './$types';
	import FormActon from '@components/common/FormActon.svelte';
	import { INPUT } from '$lib/helpers/form.helper';
	import type { FormActionResponse, FormResponse } from '@models/Error';
	import { applyAction } from '$app/forms';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';
	import { COOKEYS } from '$lib/helpers/cookie.helper';

	let isLoading = false;
	export let form: FormResponse;

	const onCancel = () => {
		Cookies.remove(COOKEYS.JWT_TOKEN);
		goto('/login');
	};

	const handleSubmit = (): FormActionResponse => {
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);
			isLoading = false;
		};
	};

	export let data: PageServerData;
</script>

<div class="flex items-center mt-48 flex-col gap-4">
  <p class="text-secondary text-2xl text-center">Scan this QR code with your phone and enter the code below :</p>
  <div class="flex justify-center mt-4">
    <img src={data.qrCodeURL} alt="QR Code" />
  </div>
  <FormActon
    iconSrc="/icons/IconGearSolid.svg"
    textButton="Send code"
    placeholder="Code..."
    name={INPUT.CODE}
    {handleSubmit}
  />
  <PrimaryButton on:click={onCancel}>Cancel</PrimaryButton>
  {#if form?.internalError}
    <p class="text-red-600 font-poppins-bold">{form?.internalError}</p>
  {/if}
</div>
