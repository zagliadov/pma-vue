<script setup lang="ts">
import { useDiffStore } from "../../store/modules/difference";
import { storeToRefs } from "pinia";

const diff = useDiffStore();
const { isSpaceOpen } = storeToRefs(diff);
const { setIsSideMenuOpen, setIsSpaceOpen } = diff;

const handleSpaceOpen = () => {
  setIsSpaceOpen();
  console.log(isSpaceOpen.value);
};
</script>

<template>
  <div class="w-[400px] h-screen border-r absolute bg-white">
    <div class="flex justify-between items-center px-4 py-2 border-b h-[56px]">
      <div class="flex items-center">
        <IconCheckCircle />
        <span class="pl-1 font-medium">SAAS MVP</span>
      </div>

      <button class="flex items-center rotate-180" @click="setIsSideMenuOpen">
        <IconSideMenu />
      </button>
    </div>
    <div class="px-4 py-6">
      <div class="flex justify-between border items-center">
        <div class="flex items-center">
          <div class="border-2 border-neutral rounded-full w-5 h-5"></div>
          <span class="pl-1 font-medium">Your spaces</span>
        </div>

        <div class="pr-3">
          <button
            @click="handleSpaceOpen"
            class="flex items-center"
            :class="{ 'rotate-180': isSpaceOpen }"
          >
            <IconChevron />
          </button>
        </div>
      </div>
      <div v-if="isSpaceOpen">
        
      </div>
      <div v-if="isSpaceOpen" class="pt-">helo</div>
    </div>
  </div>
</template>
