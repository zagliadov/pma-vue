<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useDiffStore } from "@/store/modules/difference";
import { useProjectStore } from "@/store/modules/project";
import IconTimeline from "@/components/icons/IconTimeline.vue";
import {
  getEmailFromCurrentPath,
  getWorkspaceIdFromCurrentPath,
  getProjectIdFromCurrentPath,
  isCreateProjectRoute,
  createMainTableRoute,
  createTimelineTableRoute,
} from "@/helpers/helpers";

const diffStore = useDiffStore();
const projectStore = useProjectStore();
const { project } = storeToRefs(projectStore);
const { setIsSideMenuOpen } = diffStore;
const { isSideMenuOpen } = storeToRefs(diffStore);
const router = useRouter();

const handleSideMenuOpen = async () => {
  setIsSideMenuOpen();
};
</script>

<template>
  <div class="flex flex-col">
    <SideMenu v-if="isSideMenuOpen" />
    <div class="flex justify-start pr-4 py-2 border-b h-[56px]">
      <div class="flex items-center">
        <button class="pl-4 flex items-center" @click="handleSideMenuOpen">
          <IconSideMenu />
        </button>
      </div>

      <div class="flex items-center" v-if="!isCreateProjectRoute(router)">
        <span class="font-medium text-lg pr-4">{{ project?.name }}</span>
        <div class="border-r border-base-300 h-4 w-1"></div>
        <RouterLink
          :to="createMainTableRoute(router)"
          class="flex items-center px-4"
        >
          <IconMainTableColumns />
          <span class="text-neutral pl-1">Main Table</span>
        </RouterLink>
        <div class="border-r border-base-300 h-4 w-1"></div>
        <RouterLink
          :to="createTimelineTableRoute(router)"
          class="flex items-center pl-4"
        >
          <IconTimeline />
          <span class="text-neutral pl-1">Timeline</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
