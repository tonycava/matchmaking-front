<script lang="ts">
	import { INPUT } from '$lib/utils.js';
	import { applyAction, enhance } from '$app/forms';
	import Loading from '@components/common/Loading.svelte';
	import IconUserSolid from '@components/svg/IconUserSolid.svelte';
	import IconLockSolid from '@components/svg/IconLockSolid.svelte';
	import type { FormResponse } from '@models/User';

	export let form: FormResponse;

	let isLoading = false;

	const handleSubmit = () => {
		isLoading = true;
		return async ({ result }) => {
			console.log(result);
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
    before:-bottom-3 before:absolute before:content-[''] before:w-32 before:h-1 before:bg-secondary">Register</span>

  <form action="?/register" class="bg-cover bg-[url('/3dcube.jpg')] text-secondary flex flex-col w-96 gap-4 pt-10 pb-6"
        enctype="multipart/form-data"
        method="POST" use:enhance={handleSubmit}>
    <fieldset class="bg-primary mx-auto flex p-1 rounded gap-4 justify-center [&>svg]:w-6 [&>svg]:h-6 [&>svg]:my-auto">
      <IconUserSolid color="#ffeba7" />
      <input class="bg-primary placeholder-gray-500 outline-0 h-10 p-1 w-8/12 rounded text-sm" id={INPUT.USERNAME}
             name={INPUT.USERNAME} placeholder="Username"
             type="text" />
    </fieldset>

    <fieldset class="bg-primary mx-auto flex p-1 rounded gap-4 justify-center [&>svg]:w-6 [&>svg]:h-6 [&>svg]:my-auto">
      <IconLockSolid color="#ffeba7" />
      <input class="bg-primary placeholder-gray-500 outline-0 h-10 p-1 w-8/12 rounded text-sm" id={INPUT.PASSWORD}
             name={INPUT.PASSWORD} placeholder="Password"
             type="password" />
    </fieldset>
    <div class="flex justify-center flex flex-col gap-1">
      {#if form?.internalError}
        <span class="text-sm text-red-600 text-center font-poppins-bold">{form?.internalError}</span>
      {/if}
      <button class="bg-secondary p-2 rounded p-3 w-fit mx-auto text-primary text-sm font-bold" type="submit">Register</button>
    </div>
  </form>
</div>

<span class="absolute text-sm bottom-0 p-3 text-secondary font-poppins-medium">
  Have an account ?
  <a
    class="font-poppins-bold"
    href="/login">Login !
  </a>
</span>