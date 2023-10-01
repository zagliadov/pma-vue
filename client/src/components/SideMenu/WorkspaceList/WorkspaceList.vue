<script setup lang="ts">
import { useWorkspaceStore } from "@/store/modules/workspace";
import { useDiffStore } from "@/store/modules/difference";
import { useProjectStore } from "@/store/modules/project";
import { useAuthStore } from "@/store/modules/auth";
import OpenProjectListButton from "./OpenProjectListButton.vue";
import CreateNewProjectButton from "./CreateNewProjectButton.vue";
import ProjectWorkspaceLink from "./ProjectWorkspaceLink.vue";
import ProjectOptionsMenu from "./ProjectOptionsMenu.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import type { IExistingUser } from "@/store/interfaces";

const workspaceStore = useWorkspaceStore();
const projectStore = useProjectStore();
const authStore = useAuthStore();
const differenceStore = useDiffStore();
const { projects } = storeToRefs(projectStore);
const { getProjects } = projectStore;
const { workspaces } = storeToRefs(workspaceStore);
const { existingUser } = storeToRefs(authStore);
const { email } = existingUser.value as IExistingUser;
const { setIsSideMenuOpen } = differenceStore;
const selectWorkspaceId = ref<number>(0);
const hoveredProjectId = ref<number | null>(null);

const handleCloseSideMenu = () => {
  setIsSideMenuOpen();
};
const handleOpenProject = async (workspaceId: number) => {
  await getProjects(workspaceId).then(() => {
    selectWorkspaceId.value = workspaceId;
  });
};
</script>

<template>
  <div class="pt-4">
    <div v-for="{ name, id } in workspaces" :key="id" class="flex flex-col">
      <div class="flex items-center justify-between pt-2">
        <OpenProjectListButton
          :id="id"
          :name="name"
          :selectWorkspaceId="selectWorkspaceId"
          :handleOpenProject="handleOpenProject"
        />
        <CreateNewProjectButton
          :email="email"
          :id="id"
          :handleCloseSideMenu="handleCloseSideMenu"
        />
      </div>

      <div v-if="selectWorkspaceId === id" class="pt-1 pl-4">
        <div v-for="{ name, id } in projects" :key="id" class="pt-2">
          <div
            class="flex items-center justify-between"
            @mouseenter="hoveredProjectId = id"
            @mouseleave="hoveredProjectId = null"
          >
            <ProjectWorkspaceLink
              :email="email"
              :id="id"
              :selectWorkspaceId="selectWorkspaceId"
              :name="name"
              :handleCloseSideMenu="handleCloseSideMenu"
            />
            <ProjectOptionsMenu
              :hoveredProjectId="hoveredProjectId"
              :id="id"
              :handleCloseSideMenu="handleCloseSideMenu"
              :selectWorkspaceId="selectWorkspaceId"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
