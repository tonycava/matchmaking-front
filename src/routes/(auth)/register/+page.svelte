<script lang="ts">
	import type { FormResponse } from '@models/Error';
	import PrimaryButton from '@components/button/PrimaryButton.svelte';

	export let form: FormResponse;
</script>

<div class="flex justify-center flex flex-col gap-1">
  {#if form?.internalError}
    <span class="text-sm text-red-600 text-center font-poppins-bold">{form?.internalError}</span>
  {/if}
  <PrimaryButton type="submit">Register</PrimaryButton>
</div>

<span class="absolute text-sm bottom-0 left-0 p-3 text-secondary font-poppins-medium">
  Have an account ?
  <a
    class="font-poppins-bold"
    href="/login">Login !
  </a>
</span>