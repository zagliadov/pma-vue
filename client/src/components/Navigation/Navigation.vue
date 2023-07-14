<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDiffStore } from "../../store/modules/difference";

const diff = useDiffStore();
const { setIsSideMenuOpen } = diff;
const { isSideMenuOpen } = storeToRefs(diff);

const handleSideMenuOpen = async () => {
  setIsSideMenuOpen();
};
</script>

<template>
  <div class="flex flex-col">
    <SideMenu v-if="isSideMenuOpen" />
    <div class="flex justify-start pr-4 py-2 border-b h-[56px]">
      <button class="pl-4 flex items-center" @click="handleSideMenuOpen">
        <IconSideMenu />
      </button>
    </div>
  </div>
</template>
