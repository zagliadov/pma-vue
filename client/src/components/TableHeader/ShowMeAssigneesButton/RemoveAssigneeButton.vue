<script setup lang="ts">
import { getProjectIdFromCurrentPath } from "@/helpers/helpers";
import { useAssigneeStore } from "../../../store/modules/assignee";
import { useRouter } from "vue-router";

const { assigneeId, hoveredAssignee, assigneeEmail } = defineProps([
  "assigneeId",
  "hoveredAssignee",
  "assigneeEmail",
]);
const router = useRouter();
const projectId = getProjectIdFromCurrentPath(router);
const assigneeStore = useAssigneeStore();
const { removeProjectAssignee, getProjectAssignees } = assigneeStore;
const handleRemoveProjectAssignee = async (
  assigneeId: number,
  projectId: number,
  assigneeEmail: string
) => {
  await removeProjectAssignee(assigneeId, projectId, assigneeEmail);
  await getProjectAssignees(Number(projectId));
};
</script>

<template>
  <div v-if="hoveredAssignee === assigneeEmail" class="flex items-center">
    <button @click="handleRemoveProjectAssignee(assigneeId, projectId, assigneeEmail)">
      <IconClose />
    </button>
  </div>
</template>
