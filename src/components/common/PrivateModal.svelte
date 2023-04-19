<script lang="ts">
  import Svg from "@components/layout/Svg.svelte";
</script>

<div class="absolute p-4 left-1/2 -translate-x-1/2 top-1/2 flex -translate-y-1/2 w-96 h-40 border-secondary border-2">
  <div class="w-1/3 flex justify-center items-center h-full">
    <Svg src="/icons/IconLockSolid.svg" size={20} color="#ffeba7" />
  </div>
  <div class="w-full ml-4">
    <h1 class="text-secondary text-xl">This account is private</h1>
    <p class="text-secondary mt-4">Follow this account to see his stats and last chats sent</p>
  </div>
</div>