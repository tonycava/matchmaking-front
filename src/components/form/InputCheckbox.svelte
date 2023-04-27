<script lang="ts">
	export let className = '';
	export let checked: boolean;
</script>

<div
	class="flex items-center w-[90%] pl-4 border border-gray-200 gap-4 rounded dark:border-gray-700 {className}"
>
	<label
		for="bordered-checkbox-2"
		class="py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Private account</label
	>
	<input
		on:change
		bind:checked
		id="bordered-checkbox-2"
		type="checkbox"
		class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
	/>
</div>
