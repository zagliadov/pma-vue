<script setup lang="ts">
import { useAssigneeStore } from "../../../store/modules/assignee";

const { assigneeId, projectId, hoveredAssignee, assigneeEmail } = defineProps([
  "assigneeId",
  "projectId",
  "hoveredAssignee",
  "assigneeEmail",
]);
const assigneeStore = useAssigneeStore();
const { removeProjectAssignee } = assigneeStore;
const handleRemoveProjectAssignee = async (
  assigneeId: number,
  projectId: number,
  assigneeEmail: string,
) => {
  await removeProjectAssignee(assigneeId, projectId, assigneeEmail);
};
</script>

<template>
  <div v-if="hoveredAssignee === assigneeId" class="flex items-center">
    <button @click="handleRemoveProjectAssignee(assigneeId, projectId, assigneeEmail)">
      <IconClose />
    </button>
  </div>
</template>
