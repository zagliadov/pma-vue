<script setup lang="ts">
import { useProjectStore } from "../../../store/modules/project";
import { useAssigneeStore } from "../../../store/modules/assignee";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { capitalizeFirstLetter, getProjectIdFromCurrentPath } from "../../../helpers/helpers";
import { ref } from "vue";
import { API_URL } from "../../../helpers/constants";

const router = useRouter();
const projectStore = useProjectStore();
const assigneeStore = useAssigneeStore();
const { removeProjectAssignee } = assigneeStore;
const { project } = storeToRefs(projectStore);
const assignees = project?.value?.projectAssignees;
const assigneesLength = project?.value?.projectAssignees.length;
const hoveredAssignee = ref<number | null>(null);
const projectId = getProjectIdFromCurrentPath(router);

const handleRemoveProjectAssignee = async (assigneeId: number, projectId: number) => {
  await removeProjectAssignee(assigneeId, projectId);
};
const handleAddMembers = () => {
  console.log("add members fn");
};
</script>

<template>
  <details class="dropdown pl-10">
    <summary class="btn bg-transparent border-none">
      <IconEye /><span>Show me</span>
    </summary>
    <div
      class="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-60 p-0"
    >
      <div class="p-2 border-b">
        <span class="text-gray-400 pl-3">Members ({{ assigneesLength }})</span>
      </div>
      <div class="border-b">
        <div v-for="assignee in assignees" class="px-2 py-1">
          <div
            class="hover:bg-gray-200 flex items-center justify-between rounded p-1"
            @mouseenter="hoveredAssignee = assignee.id"
            @mouseleave="hoveredAssignee = null"
          >
            <div class="flex items-center">
              <div
                :style="{
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundImage: assignee?.avatar_filename
                    ? `url(${API_URL}/user/user_avatar/${assignee?.avatar_filename})`
                    : 'none',
                }"
                class="flex items-center justify-center w-10 h-10 border rounded-full bg-white"
              >
                <span>
                  {{
                    !assignee?.avatar_filename
                      ? capitalizeFirstLetter(assignee?.email)
                      : ""
                  }}
                </span>
              </div>
              <div class="pl-3">
                <span>
                  {{
                    assignee.firstName || assignee.lastName
                      ? `${assignee.firstName} ${assignee.lastName}`
                      : assignee.name
                  }}
                </span>
              </div>
            </div>

            <div
              v-if="hoveredAssignee === assignee.id"
              class="flex items-center"
            >
              <button @click="handleRemoveProjectAssignee(assignee.id, projectId)">
                <IconClose />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 py-2">
        <button class="btn w-full" @click="handleAddMembers">
          <IconPlus />
          <span class="text-primary">Add members</span>
        </button>
      </div>
    </div>
  </details>
</template>
