<script setup lang="ts">
const { projectStore } = defineProps(["projectStore"]);
</script>

<template>
  <div class="p-2 border-b">
    <span class="text-gray-400 pl-3">
      Members ({{ projectStore?.project?.projectAssignees.length || 0 }})
    </span>
  </div>
</template>
