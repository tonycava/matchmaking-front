<script lang="ts">
	import type { User } from '@models/User';
	export let demand: { id: string, userToFollow: User };
</script>

<div class="w-[95%] flex items-center border-secondary border-2 rounded p-2">
  <img src={demand.userToFollow.profilePicture
		? `data:image/png;base64,${demand.userToFollow.profilePicture}`
		: '/default.png'} alt="user icon" />
  <span class="ml-4">{demand.userToFollow.username}</span>
  <div class="ml-auto flex gap-4">
    <button
      on:click
      type="button"
      class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Accept
    </button>
    <button
      on:click
      type="button"
      class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
    >
      Reject
    </button>
  </div>
</div>