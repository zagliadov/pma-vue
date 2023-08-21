<script setup lang="ts">
import { useWorkspaceStore } from "@/store/modules/workspace";
import { useDiffStore } from "@/store/modules/difference";
import { useProjectStore } from "@/store/modules/project";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import {
  parseUsernameFromEmail,
  capitalizeFirstLetter,
  getEmailFromCurrentPath,
  createMainTableRoute,
  createTimelineTableRoute,
} from "../../../helpers/helpers";
import { ref } from "vue";
import { useRouter } from "vue-router";

const workspaceStore = useWorkspaceStore();
const projectStore = useProjectStore();
const authStore = useAuthStore();
const differenceStore = useDiffStore();
const { projects } = storeToRefs(projectStore);
const { workspaces } = storeToRefs(workspaceStore);
const { existingUser } = storeToRefs(authStore);
const { email } = existingUser.value;
const { getProjects } = projectStore;
const { setIsSideMenuOpen } = differenceStore;
const selectWorkspaceId = ref<number>(0);
const hoveredProjectId = ref<number | null>(null);
const router = useRouter();

const handleOpenProject = async (workspaceId: number) => {
  await getProjects(workspaceId).then(() => {
    selectWorkspaceId.value = workspaceId;
  });
};

const handleCloseSideMenu = () => {
  setIsSideMenuOpen();
};
</script>

<template>
  <div class="pt-4">
    <div v-for="{ name, id } in workspaces" :key="id" class="flex flex-col">
      <div class="flex items-center justify-between pt-2">
        <div class="flex items-center">
          <button
            class="flex items-center"
            :class="{ 'rotate-180': selectWorkspaceId === id }"
            @click="handleOpenProject(id)"
          >
            <IconChevron />
          </button>
          <span class="pl-2">{{ name }}</span>
        </div>
        <div class="flex items-center pr-3">
          <RouterLink
            :to="`/${parseUsernameFromEmail(
              email
            )}/workspace/${id}/create_project`"
            @click="handleCloseSideMenu"
            class="text-gray-600 font-medium text-sm pl-2 hover:text-primary"
          >
            <IconPlus class="stroke-neutral" />
          </RouterLink>
        </div>
      </div>

      <div v-if="selectWorkspaceId === id" class="pt-1 pl-4">
        <div v-for="{ name, id } in projects" :key="id" class="pt-2">
          <div
            class="flex items-center justify-between"
            @mouseenter="hoveredProjectId = id"
            @mouseleave="hoveredProjectId = null"
          >
            <RouterLink
              :to="`/${parseUsernameFromEmail(
                email
              )}/workspace/${selectWorkspaceId}/project/${id}`"
              @click="handleCloseSideMenu"
              class="flex items-center text-gray-600 pl-2 hover:text-primary"
            >
              <div>
                <span
                  class="w-8 h-8 flex items-center justify-center rounded bg-gray-300"
                  >{{ capitalizeFirstLetter(name) }}</span
                >
              </div>
              <span class="text-base pl-2 pr-4 w-[260px]">{{ name }}</span>
            </RouterLink>

            <div v-if="hoveredProjectId === id" class="dropdown dropdown-right">
              <button tabIndex="{0}">
                <IconMoreVerticalSettings />
              </button>
              <div tabindex="{0}" class="dropdown-content z-[1] menu p-5">
                <div class="w-[180px] shadow bg-base-100 rounded">
                  <div>
                    <RouterLink
                      :to="`/my_settings/${getEmailFromCurrentPath(
                        router
                      )}/projects`"
                      @click="handleCloseSideMenu"
                      class="flex items-center justify-between p-3 hover:bg-neutral-content"
                    >
                      <div class="flex items-center">
                        <IconMySettingsProject />
                        <span class="pl-3">Settings</span>
                      </div>
                    </RouterLink>
                    <RouterLink
                      :to="`/my_settings/${getEmailFromCurrentPath(
                        router
                      )}/projects`"
                      @click="handleCloseSideMenu"
                      class="flex items-center justify-between p-3 hover:bg-neutral-content"
                    >
                      <div class="flex items-center">
                        <IconUsers />
                        <span class="pl-3">Members</span>
                      </div>
                    </RouterLink>
                    <RouterLink
                      :to="`/${getEmailFromCurrentPath(
                        router
                      )}/workspace/${selectWorkspaceId}/project/${id}`"
                      @click="handleCloseSideMenu"
                      class="flex items-center justify-between p-3 hover:bg-neutral-content"
                    >
                      <div class="flex items-center">
                        <IconTable />
                        <span class="pl-3">Main Table</span>
                      </div>
                    </RouterLink>
                    <RouterLink
                    :to="`/${getEmailFromCurrentPath(
                        router
                      )}/workspace/${selectWorkspaceId}/project/${id}/timeline`"
                      @click="handleCloseSideMenu"
                      class="flex items-center justify-between p-3 hover:bg-neutral-content"
                    >
                      <div class="flex items-center">
                        <IconTimelineTable />
                        <span class="pl-3">Timeline</span>
                      </div>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
