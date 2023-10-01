<script setup lang="ts">
const { handleAssigneeOpen, isAssigneeOpen } = defineProps<{
  handleAssigneeOpen: Function;
  isAssigneeOpen: boolean;
}>();
</script>

<template>
  <div
    class="flex justify-between items-center cursor-pointer"
    @click="handleAssigneeOpen()"
  >
    <div class="flex items-center">
      <div class="border-2 border-neutral rounded-full w-5 h-5"></div>
      <span class="pl-1 text-lg">Project assignee</span>
    </div>

    <div class="pr-3">
      <button
        class="flex items-center"
        :class="{ 'rotate-180': isAssigneeOpen }"
      >
        <IconChevron />
      </button>
    </div>
  </div>
</template>
