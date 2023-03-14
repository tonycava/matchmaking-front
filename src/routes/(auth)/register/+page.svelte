<script lang="ts">
	import { INPUT } from '$lib/utils.js';
	import { applyAction, enhance } from '$app/forms';
	import Loading from '@components/Loading.svelte';
	import { page } from '$app/stores';

	let isLoading = false;

	$: console.log('form', $page.form);

	const handleSubmit = () => {
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

<form action="?/register" enctype="multipart/form-data" method="POST" use:enhance={handleSubmit}>
  <label for={INPUT.USERNAME}>Username :</label>
  <input id={INPUT.USERNAME} name={INPUT.USERNAME} type="text" />
  <label for={INPUT.PASSWORD}>Password :</label>
  <input id={INPUT.PASSWORD} name={INPUT.PASSWORD} type="password" />

  <button type="submit">Send</button>
</form>