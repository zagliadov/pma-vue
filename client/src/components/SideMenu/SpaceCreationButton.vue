<script setup lang="ts">
const { isSpaceOpen, handleOpenSpaceCreation } = defineProps<{
  isSpaceOpen: boolean;
  handleOpenSpaceCreation: Function;
}>();
</script>

<template>
  <button
    v-if="isSpaceOpen"
    class="flex items-center pt-3 pl-5"
    @click="handleOpenSpaceCreation()"
  >
    <IconPlus />
    <span class="font-lg font-medium pl-2 text-primary">New space</span>
  </button>
</template>
