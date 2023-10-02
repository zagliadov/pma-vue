<script setup lang="ts">
const { handleProjectNameEditModal, name } = defineProps<{
  handleProjectNameEditModal: Function;
  name: string;
}>();
</script>

<template>
  <span class="font-medium text-2xl pr-4">{{ name }}</span>
  <button @click="handleProjectNameEditModal()">
    <IconEdit />
  </button>
</template>
