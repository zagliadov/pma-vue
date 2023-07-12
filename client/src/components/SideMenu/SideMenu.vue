<script setup lang="ts">
import { useDiffStore } from "../../store/modules/difference";

const diff = useDiffStore();
const { setIsSideMenuOpen } = diff;
</script>

<template>
  <div class="w-[400px] h-screen border-r absolute bg-white">
    <div class="flex justify-end pr-4 py-2 border-b h-[56px]">
      <button class="flex items-center rotate-180" @click="setIsSideMenuOpen">
        <IconSideMenu />
      </button>
    </div>
  </div>

</template>