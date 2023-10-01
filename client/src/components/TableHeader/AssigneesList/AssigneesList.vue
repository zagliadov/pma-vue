<script setup lang="ts">
import { useProjectStore } from "../../../store/modules/project";
import { ref, computed } from "vue";
import AssigneeAvatar from "./AssigneeAvatar.vue";

const projectStore = useProjectStore();
const assigneeArray = ref<any>(
  projectStore?.project?.projectAssignees &&
    projectStore?.project?.projectAssignees?.length > 3
    ? projectStore?.project?.projectAssignees.slice(0, 3)
    : projectStore?.project?.projectAssignees.slice()
);

const lengthDifference = computed(
  () =>
    projectStore?.project?.projectAssignees &&
    projectStore?.project?.projectAssignees?.length - assigneeArray.value.length
);
</script>

<template>
  <div className="flex items-center pl-10">
    <div v-for="(assignee, index) in assigneeArray" :key="assignee.id">
      <AssigneeAvatar :assignee="assignee" :index="index" />
    </div>
    <div
      class="flex items-center justify-center w-10 h-10 border rounded-full bg-white ml-[-15px] z-10"
    >
      <span>+ {{ lengthDifference }}</span>
    </div>
  </div>
</template>
