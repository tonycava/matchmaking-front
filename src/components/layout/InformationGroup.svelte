<script lang="ts">
	export let informations: string[];
</script>


<div class="flex flex-col">
  {#each informations as information (information)}
    <span class="text-secondary text-lg flex-1 font-poppins-regular items-center flex">{@html information}</span>
  {/each}
</div>