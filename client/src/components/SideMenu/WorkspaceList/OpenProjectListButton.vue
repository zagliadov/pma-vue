<script setup lang="ts">
const { id, name, selectWorkspaceId, handleOpenProject } = defineProps<{
  id: number
  name: string
  selectWorkspaceId: number
  handleOpenProject: Function
}>();
</script>

<template>
  <div class="flex items-center cursor-pointer" @click="handleOpenProject(id)">
    <button
      class="flex items-center"
      :class="{ 'rotate-180': selectWorkspaceId === id }"
    >
      <IconChevron />
    </button>
    <span class="pl-2">{{ name }}</span>
  </div>
</template>
