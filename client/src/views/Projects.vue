<script setup lang="ts">
import { useProjectStore } from "@/store/modules/project";
import { storeToRefs } from "pinia";
import { capitalizeFirstLetter } from "@/helpers/helpers";

const projectStore = useProjectStore();
const { totalProjectsCount, allProjects } = storeToRefs(projectStore);
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
          class="flex items-center rounded hover:bg-gray-200"
        >
          <div class="flex items-center px-3 py-2">
            <div
              class="flex items-center justify-center rounded w-10 h-10 bg-gray-300"
            >
              <span>{{ capitalizeFirstLetter(name) }}</span>
            </div>
            <span class="pl-3">{{ name }}</span>
          </div>
        </div>
      </div>
    </div>
  </MySettingsLayout>
</template>
