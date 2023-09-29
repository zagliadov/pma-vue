<script setup lang="ts">
import { useProjectStore } from "@/store/modules/project";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import TableHeader from "../components/TableHeader/TableHeader.vue";
import ProjectTasksTable from "../components/ProjectTasksTable/ProjectTasksTable.vue";

const router = useRouter();
const currentProjectId = ref(router.currentRoute.value.params.project_id);
const projectStore = useProjectStore();
const { getProject } = projectStore;
watch(
  () => router.currentRoute.value.params.project_id,
  async (newProjectId) => {
    currentProjectId.value = newProjectId;
    await getProject(Number(newProjectId));
  }
);
</script>

<template>
  <Layout>
    <TableHeader />
    <ProjectTasksTable />
  </Layout>
</template>
