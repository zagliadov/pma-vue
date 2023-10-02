<script setup lang="ts">
import { useProjectStore } from "../../../store/modules/project";

const projectStore = useProjectStore();
</script>

<template>
  <span class="font-medium text-2xl">Projects</span>
  <span class="pt-6 pb-6 font-medium text-lg"
    >Your projects ({{ projectStore?.totalProjectsCount || 0 }})
  </span>
</template>
