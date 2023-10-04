<script setup lang="ts">
import { useProjectStore } from "../../../store/modules/project";
import { useRouter } from "vue-router";
import { getProjectIdFromCurrentPath } from "../../../helpers/helpers";
import { ref } from "vue";
import AssigneeName from "./AssigneeName.vue";
import MembersCount from "./MembersCount.vue";
import RemoveAssigneeButton from "./RemoveAssigneeButton.vue";
import AddMembersButton from "./AddMembersButton.vue";
import AssigneeAvatar from "./AssigneeAvatar.vue";

const router = useRouter();
const projectStore = useProjectStore();
const hoveredAssignee = ref<number | null>(null);
const projectId = getProjectIdFromCurrentPath(router);
</script>

<template>
  <details class="dropdown pl-10 pr-2">
    <summary class="btn bg-transparent border-none">
      <IconEye /><span>Show me</span>
    </summary>
    <div
      class="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-60 p-0"
    >
      <MembersCount :projectStore="projectStore" />
      <div class="border-b">
        <div
          v-for="assignee in projectStore?.project?.projectAssignees || []"
          class="px-2 py-1"
        >
          <div
            class="hover:bg-gray-200 flex items-center justify-between rounded p-1"
            @mouseenter="hoveredAssignee = assignee.id"
            @mouseleave="hoveredAssignee = null"
          >
            <div class="flex items-center">
              <AssigneeAvatar :assignee="assignee" />
              <AssigneeName :assignee="assignee" />
            </div>
            <RemoveAssigneeButton
              v-if="!assignee.projectCreator"
              :assigneeId="assignee.id"
              :hoveredAssignee="hoveredAssignee"
              :projectId="projectId"
              :assigneeEmail="assignee.email"
            />
          </div>
        </div>
      </div>
      <AddMembersButton :projectId="projectId" />
    </div>
  </details>
</template>
