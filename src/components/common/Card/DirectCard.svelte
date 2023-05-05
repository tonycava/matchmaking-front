<script lang="ts">
	import type { Direct } from 'matchmaking-shared';
	import { getRelativeTime } from '$lib/date.utils';
	import { user } from '@stores/user.store';
	import type { DirectOpponentUser } from '@models/User';

	export let direct: Direct;


	export let directOpponentUser: DirectOpponentUser;
	export let addClasses = '';
</script>

<li
	class="break-words rounded bg-[#84743e] text-black p-1 w-[calc(50%-.75rem)] mt-2 ml-2 {addClasses} {$user?.id ===
		direct.personWhoSendId && 'ml-auto mr-2 bg-[#ffeba7]'}"
>
	<div class="flex justify-between">
		<a
			href={`/profile/${$user?.id === direct.personWhoSendId ? '' : direct.personWhoRecivedId}`}
			class="text-sm font-poppins-regular hover:underline"
			>{$user?.id === direct.personWhoRecivedId ? directOpponentUser?.username : $user?.username} :
			<br /></a
		>
		<span class="text-sm font-poppins-regular">{getRelativeTime(new Date(direct.createdAt))}</span>
	</div>
	<p class="font-poppins-medium pt-2">{direct.content}</p>
</li>
