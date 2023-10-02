<script setup lang="ts">
import { useAssigneeStore } from "../../../store/modules/assignee";
const assigneeStore = useAssigneeStore();
</script>

<template>
  <span class="pt-6 pb-6 font-medium text-lg"
    >Your members ({{ assigneeStore?.assigneeProjects.length || 0 }})
  </span>
</template>
