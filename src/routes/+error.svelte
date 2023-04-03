<script>
	import { goto } from "$app/navigation";
	import PrimaryButton from "@components/button/PrimaryButton.svelte";
</script>

<div class="bg-primary h-screen grid grid-cols-3 grid-rows-3">
    <div class="col-start-2 row-start-2 flex flex-col items-center">
        <p class="text-primary-text mb-5">An error as occured come back to the safe place</p>
        <PrimaryButton type="button" on:click = {() => goto("/")}>Go Home</PrimaryButton>
    </div>
</div>