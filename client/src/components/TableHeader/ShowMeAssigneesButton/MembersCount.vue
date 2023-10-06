<script setup lang="ts">
import { useAssigneeStore } from '@/store/modules/assignee';

const assigneeStore = useAssigneeStore();
</script>

<template>
  <div class="p-2 border-b">
    <span class="text-gray-400 pl-3">
      Members ({{ assigneeStore?.projectAssignees.length || 0 }})
    </span>
  </div>
</template>
