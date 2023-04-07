<script>
  import PrimaryButton from '@components/button/PrimaryButton.svelte';
  import { goto } from '$app/navigation';
</script>

<div class="flex justify-center items-center flex-col h-screen gap-8">
  <h1 class="text-secondary font-poppins-medium text-3xl text-center">Are you lost ?</h1>
  <PrimaryButton on:click={() => goto('/')}>Go back on a safe place</PrimaryButton>
</div>