<script lang="ts">
	import PageData = App.PageData;

	export let data: PageData;
</script>

<h1 class="text-red-600">Hello {data.user.username}</h1>
<button>Go to the matchmaking</button>