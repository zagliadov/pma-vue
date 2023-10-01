<script setup lang="ts">
const { assignee } = defineProps(["assignee"]);
</script>

<template>
  <div class="pl-3">
    <span>
      {{
        assignee.firstName || assignee.lastName
          ? `${assignee.firstName} ${assignee.lastName}`
          : assignee.name
      }}
    </span>
  </div>
</template>
