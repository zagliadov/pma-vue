<script setup lang="ts">
import { useProjectStore } from "@/store/modules/project";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { capitalizeFirstLetter } from "@/helpers/helpers";

const projectStore = useProjectStore();
const { totalProjectsCount, allProjects } = storeToRefs(projectStore);
const hoveredProjectId = ref<number | null>(null);
</script>

<template>
  <MySettingsLayout>
    <div>
      <div class="flex flex-col">
        <span class="font-medium text-2xl">Projects</span>
        <span class="pt-6 pb-6 font-medium text-lg"
          >Your projects ({{ totalProjectsCount }})</span
        >
        <div
          v-for="{ id, name } in allProjects"
          :key="id"
          class="flex items-center justify-between rounded hover:bg-gray-200"
          @mouseenter="hoveredProjectId = id"
          @mouseleave="hoveredProjectId = null"
        >
          <div class="flex items-center px-3 py-2">
            <div
              class="flex items-center justify-center rounded w-10 h-10 bg-gray-300"
            >
              <span>{{ capitalizeFirstLetter(name) }}</span>
            </div>
            <span class="pl-3">{{ name }}</span>
          </div>
          <div v-if="hoveredProjectId === id" class="p-4">
            <button class="border border-gray-300 rounded p-2">
              <IconMoreVerticalSettings />
            </button>
          </div>
        </div>
      </div>
    </div>
  </MySettingsLayout>
</template>
