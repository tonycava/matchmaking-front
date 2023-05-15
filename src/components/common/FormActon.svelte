<script lang="ts">
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import InputFieldset from '@components/form/InputFieldset.svelte';
	import { enhance } from '$app/forms';

	export let handleSubmit: () => void;
	export let value: string;
	export let name: string;
	export let textButton: string;
	export let action = '';
	export let iconSrc = '/icons/IconMessageSolid.svg';
	export let addClasses = '';
	export let placeholder = '';
</script>

<form
  method="POST"
  enctype="multipart/form-data"
  {action}
  use:enhance={handleSubmit}
  class="flex gap-2 m-1 {addClasses}"
>
  <div class="flex w-full gap-2 flex justify-center">
    <InputFieldset
      {placeholder}
      autocomplete="off"
      autofocus
      addClasses="w-[calc(100%-9rem)]"
      {name}
      size={8}
      bind:value
      src={iconSrc}
    />
    <PrimaryButton css="h-full" id="messageButton" type="submit">{textButton}</PrimaryButton>
  </div>
</form>
