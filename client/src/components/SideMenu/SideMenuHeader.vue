<script setup lang="ts">
import { useDiffStore } from "@/store/modules/difference";

const diff = useDiffStore();
const { setIsSideMenuOpen } = diff;
</script>

<template>
  <div class="flex justify-between items-center px-4 py-2 border-b h-[56px]">
    <div class="flex items-center">
      <IconCheckCircle />
      <span class="pl-1 font-medium">SAAS MVP</span>
    </div>

    <button class="flex items-center rotate-180" @click="setIsSideMenuOpen">
      <IconSideMenu />
    </button>
  </div>
</template>
