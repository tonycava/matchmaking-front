<script lang="ts">
  import Svg from '@components/layout/Svg.svelte';

	export let tittle: string;
	export let description: string;
</script>

<div class="absolute left-1/2 -translate-x-1/2 z-30 mt-10 px-4">
  <div class="opacity-25 w-full h-full absolute z-10 inset-0"></div>
  <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
    <div class="md:flex items-center">
      <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
        <Svg size={12} src="/icons/IconExclamationSolid.svg" />
      </div>
      <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
        <p class="font-bold">{tittle}</p>
        <p class="text-sm text-gray-700 mt-1">{description}</p>
      </div>
    </div>
    <div class="text-center md:text-right mt-4 md:flex md:justify-end">
      <button on:click class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
        Approved
      </button>
      <button on:click class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">
        Cancel
      </button>
    </div>
  </div>
</div>
