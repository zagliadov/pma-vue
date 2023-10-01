<script setup lang="ts">
import { useAssigneeStore } from "../../../store/modules/assignee";

const { assigneeId, projectId, hoveredAssignee } = defineProps([
  "assigneeId",
  "projectId",
  "hoveredAssignee",
]);
const assigneeStore = useAssigneeStore();
const { removeProjectAssignee } = assigneeStore;
const handleRemoveProjectAssignee = async (
  assigneeId: number,
  projectId: number
) => {
  await removeProjectAssignee(assigneeId, projectId);
};
</script>

<template>
  <div v-if="hoveredAssignee === assigneeId" class="flex items-center">
    <button @click="handleRemoveProjectAssignee(assigneeId, projectId)">
      <IconClose />
    </button>
  </div>
</template>
