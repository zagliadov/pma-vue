<script setup lang="ts">
import { useAssigneeStore } from "@/store/modules/assignee";
import { useUserStore } from "@/store/modules/user";
import { ref } from "vue";
import AssigneeAvatar from "./AssigneeAvatar.vue";
import AssigneeName from "./AssigneeName.vue";
import RemoveAssigneeButton from "./RemoveAssigneeButton.vue";

const hoveredAssignee = ref<string | null>(null);
const userStore = useUserStore();
const assigneeStore = useAssigneeStore();
</script>

<template>
  <div
    v-for="assignee in assigneeStore?.projectAssignees || []"
    class="px-2 py-1"
  >
    <div
      class="hover:bg-gray-200 flex items-center justify-between rounded p-1"
      @mouseenter="hoveredAssignee = assignee.email"
      @mouseleave="hoveredAssignee = null"
    >
      <div class="flex items-center">
        <AssigneeAvatar :assignee="assignee" />
        <AssigneeName :assignee="assignee" />
      </div>
      <RemoveAssigneeButton
        v-if="userStore.isProjectCreator && !assignee.projectCreator"
        :assigneeId="assignee.id"
        :hoveredAssignee="hoveredAssignee"
        :assigneeEmail="assignee.email"
      />
    </div>
  </div>
</template>
