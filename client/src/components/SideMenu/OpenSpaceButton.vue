<script setup lang="ts">
const { handleSpaceOpen, isSpaceOpen } = defineProps<{
  handleSpaceOpen: Function;
  isSpaceOpen: boolean;
}>();
</script>

<template>
  <div
    class="flex justify-between items-center cursor-pointer"
    @click="handleSpaceOpen()"
  >
    <div class="flex items-center">
      <div class="border-2 border-neutral rounded-full w-5 h-5"></div>
      <span class="pl-1 text-lg">Your spaces</span>
    </div>

    <div class="pr-3">
      <button class="flex items-center" :class="{ 'rotate-180': isSpaceOpen }">
        <IconChevron />
      </button>
    </div>
  </div>
</template>
