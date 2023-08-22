<script setup lang="ts">
import { useProjectStore } from "@/store/modules/project";
import { storeToRefs } from "pinia";
import TableHeader from "../components/TableHeader/TableHeader.vue";

const projectStore = useProjectStore();
const { project } = storeToRefs(projectStore);

</script>

<template>
  <Layout>
    <TableHeader />
    <div>Project Table</div>
  </Layout>
</template>
