<script setup lang="ts">
import { useProjectStore } from "@/store/modules/project";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore();
const { project } = storeToRefs(projectStore);

</script>

<template>
  <Layout>
    <div>Project Table</div>
  </Layout>
</template>
