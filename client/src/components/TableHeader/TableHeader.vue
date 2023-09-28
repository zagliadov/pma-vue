<script setup lang="ts">
import CreateTaskModal from "./CreateTaskModal/CreateTaskModal.vue";
import { storeToRefs } from "pinia";
import { useProjectStore } from "@/store/modules/project";

const projectStore = useProjectStore();
const { project } = storeToRefs(projectStore);
const assignees = project?.value?.projectAssignees;
</script>

<template>
  <div class="p-2">
    <CreateTaskModal />
    <div v-for="(id, email ) in assignees">

    </div>
  </div>
</template>
