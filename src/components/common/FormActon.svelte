<script lang="ts">
	import PrimaryButton from '@components/button/PrimaryButton.svelte';
	import InputFieldset from '@components/form/InputFieldset.svelte';
	import { enhance } from '$app/forms';
	import exp from 'constants';

	export let handleSubmit: () => void;
	export let value: string;
	export let name: string;
	export let action = '';
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	{action}
	use:enhance={handleSubmit}
	class="flex absolute bottom-0 gap-2 m-1 w-full"
>
	<div class="flex w-full gap-2">
		<InputFieldset
			placeholder="Message"
			autocomplete="off"
			autofocus
			addClasses="w-[calc(100%-9rem)]"
			{name}
			size={8}
			bind:value
			src="/icons/IconMessageSolid.svg"
		/>
		<PrimaryButton css="h-full" id="messageButton" type="submit">Send message</PrimaryButton>
	</div>
</form>
