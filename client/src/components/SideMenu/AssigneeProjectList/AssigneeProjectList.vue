<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAssigneeStore } from "@/store/modules/assignee";
import { useDiffStore } from "@/store/modules/difference";
import { useAuthStore } from "@/store/modules/auth";
import AssigneeProjectsListOpenButton from "./AssigneeProjectsListOpenButton.vue";
import AssignedProjectWorkspaceLink from "./AssignedProjectWorkspaceLink.vue";
import OpenAssignedProjectOptionsMenu from "./OpenAssignedProjectOptionsMenu.vue";
import type { IExistingUser } from "@/store/interfaces";

const assigneeStore = useAssigneeStore();
const authStore = useAuthStore();
const differenceStore = useDiffStore();
const { setIsSideMenuOpen } = differenceStore;
const { getAssigneeProjects } = useAssigneeStore();
const { assigneeProjects } = storeToRefs(assigneeStore);
const { existingUser } = storeToRefs(authStore);
const { email } = existingUser.value as IExistingUser;
const isAssigneeOpen = ref<boolean>(false);
const hoveredAssigneeProjectId = ref<number | null>(null);

const handleAssigneeOpen = async () => {
  await getAssigneeProjects();
  isAssigneeOpen.value = !isAssigneeOpen.value;
};

const handleCloseSideMenu = () => {
  setIsSideMenuOpen();
};
</script>

<template>
  <div class="px-4 py-6">
    <AssigneeProjectsListOpenButton
      :handleAssigneeOpen="handleAssigneeOpen"
      :isAssigneeOpen="isAssigneeOpen"
    />

    <div v-if="isAssigneeOpen" class="pt-1 pl-4">
      <div
        v-for="{ id, name, workspaceId } in assigneeProjects"
        :key="id"
        class="pt-2"
      >
        <div
          class="flex items-center justify-between"
          @mouseenter="hoveredAssigneeProjectId = id"
          @mouseleave="hoveredAssigneeProjectId = null"
        >
          <AssignedProjectWorkspaceLink
            :email="email"
            :id="id"
            :name="name"
            :workspaceId="workspaceId"
            :handleCloseSideMenu="handleCloseSideMenu"
          />
          <OpenAssignedProjectOptionsMenu
            :workspaceId="workspaceId"
            :handleCloseSideMenu="handleCloseSideMenu"
            :id="id"
            :hoveredAssigneeProjectId="hoveredAssigneeProjectId"
          />
        </div>
      </div>
    </div>
  </div>
</template>
