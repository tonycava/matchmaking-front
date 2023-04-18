<script lang="ts">
	import Svg from '@components/layout/Svg.svelte';
	export let isSideBarOpen = false;
</script>

<div class="min-h-screen top-0 fixed w-screen bg-[rgba(113,113,122,0.5)] z-20 isolate">
  <div class="w-1/4 h-screen bg-primary text-secondary ml-auto">
    <Svg
      on:click={() => isSideBarOpen = false}
      className="p-1 cursor-pointer ml-auto"
      size={12}
      src="/icons/IconCrossSolid.svg"
      color="#ffeba7"
    />
    <slot />
  </div>
</div>