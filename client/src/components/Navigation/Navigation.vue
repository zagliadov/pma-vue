<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDiffStore } from "../../store/modules/difference";
import { useProjectStore } from "@/store/modules/project";

const diff = useDiffStore();
const projectStore = useProjectStore();
const { project } = storeToRefs(projectStore);
const { setIsSideMenuOpen } = diff;
const { isSideMenuOpen } = storeToRefs(diff);

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

      <div class="flex items-center">
        <span class="font-medium text-lg">{{ project.name }}</span>
        <button class="flex items-center">
          <IconMainTableColumns class="stroke-neutral" />
          <span class="text-neutral">Main Table</span>
        </button>

        <button class="flex items-center">
          <IconTimeline class="stroke-neutral" />
          <span class="text-neutral">Timeline</span>
        </button>
      </div>
    </div>
  </div>
</template>
