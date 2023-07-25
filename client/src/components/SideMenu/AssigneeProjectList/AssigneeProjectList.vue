<script setup lang="ts">
import { ref } from "vue";
import { useAssigneeStore } from "@/store/modules/assignee";

const assigneeStore = useAssigneeStore();
const { getAssigneeProjects } = useAssigneeStore();

const isAssigneeOpen = ref<boolean>(false);
const handleAssigneeOpen = async () => {
  isAssigneeOpen.value = !isAssigneeOpen.value;
  await getAssigneeProjects();
};
</script>

<template>
  <div class="px-4 py-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="border-2 border-neutral rounded-full w-5 h-5"></div>
        <span class="pl-1">Project assignee</span>
      </div>

      <div class="pr-3">
        <button
          @click="handleAssigneeOpen"
          class="flex items-center"
          :class="{ 'rotate-180': isAssigneeOpen }"
        >
          <IconChevron />
        </button>
      </div>
    </div>
  </div>
</template>
