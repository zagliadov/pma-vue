<script setup lang="ts">
import { useAssigneeStore } from "@/store/modules/assignee";

const assigneeStore = useAssigneeStore();

</script>

<template>
  <div class="flex items-center justify-between" v-if="assigneeStore.projectAssignees">
    <span class="font-medium"> Members ({{ assigneeStore.projectAssignees.length }}) </span>
    <button class="btn btn-primary">
      <IconPlus class="stroke-base-100" />
      <span>add members</span>
    </button>
  </div>
</template>
