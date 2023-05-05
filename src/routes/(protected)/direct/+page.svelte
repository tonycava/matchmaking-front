<script lang="ts">
	import Svg from '@components/layout/Svg.svelte';
</script>

<div class="flex justify-center text-secondary items-center h-full flex-col gap-4">
	<div class="border-secondary border-2 p-10 rounded-full">
		<Svg className="pr-2" src="/icons/IconPaperPlane.svg" size={24} color="#ffeba7" />
	</div>
	<span class="text-secondary text-3xl font-poppins-regular">Your messages</span>
	<span>Send private messages to a friend.</span>
</div>
