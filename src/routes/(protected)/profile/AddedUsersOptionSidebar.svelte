<script lang="ts">
	import Sidebar from '@components/common/Sidebar.svelte';
	import type { UserInformation } from '@models/User';
	import type { Chat } from 'matchmaking-shared';
	import DemandCard from '@components/common/Card/DemandCard.svelte';
	import Cookies from 'js-cookie';
	import { COOKEYS } from '$lib/helpers/cookie.helper';
	import { disconnect } from '$lib/helpers/auth.helper';
	import SocialService from '@services/social.service';

	export let data: { user: UserInformation, chats: Chat[] };
	export let isSideBarOpen: boolean;
	const onChoose = async (e, idx) => {
		const jwtToken = Cookies.get(COOKEYS.JWT_TOKEN) ?? '';
		const demand = data.user.whoFollow[idx];

		try {
			if (e.target.innerHTML === 'Accept') {
				await SocialService.acceptApplication(jwtToken, demand.id, demand.userToFollow.id);
				data.user.whoFollow = data.user.whoFollow.filter((d) => d.id !== demand.id);
				return;
			}
			await SocialService.removeApplication(jwtToken, demand.id);
		} catch (e) {
			await disconnect();
		}
		data.user.whoFollow = data.user.whoFollow.filter((d) => d.id !== demand.id);
	};
</script>

<Sidebar bind:isSideBarOpen>
  {#if data.user.isAccountPrivate}
    {#if data.user.whoFollow.length > 0}
      <div class="w-full flex justify-center mt-10">
        {#each data.user.whoFollow as demand, i (demand.id)}
          <DemandCard on:click={(e) => onChoose(e, i)} {demand} />
        {/each}
      </div>
    {:else}
      <h2 class="text-center text-2xl mt-10 text-secondary">You don't have any demand !</h2>
    {/if}
  {:else}
    <h2 class="text-center text-2xl mt-10 text-secondary">You need to be in private to see your demand !</h2>
  {/if}
</Sidebar>