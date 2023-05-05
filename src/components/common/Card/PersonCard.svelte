<script lang="ts">
	export let name: string;

	export let profilePicture: string;
	export let lastMessage: string;
</script>

<div
	on:click
	class="border-2 border-secondary cursor-pointer flex h-24 border rounded w-11/12 mx-auto"
>
	<img
		src={profilePicture === '/default.png'
			? profilePicture
			: `data:image/png;base64,${profilePicture}`}
		class="h-full p-2 rounded-full"
		alt="profile picture image of {name}"
	>
	<div class="justify-center flex-col flex">
		<span class="text-xl text-secondary font-poppins-medium">{name}</span>
		<span class="text-sm text-secondary font-poppins-medium">{lastMessage}</span>
	</div>
</div>
