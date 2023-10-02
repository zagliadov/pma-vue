<script setup lang="ts">
import { capitalizeFirstLetter } from "../../../helpers/helpers";
import { useAssigneeStore } from "../../../store/modules/assignee";
import { ref } from "vue";

const assigneeStore = useAssigneeStore();
const hoveredProjectId = ref<number | null>(null);
</script>

<template>
  <div
    v-for="{ id, name } in assigneeStore?.assigneeProjects"
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
    <div v-if="hoveredProjectId === id" class="pr-4">
      <div className="dropdown dropdown-end">
        <button class="border border-gray-300 rounded p-2">
          <IconMoreVerticalSettings />
        </button>
        <div tabIndex="{0}" class="dropdown-content z-[1] menu p-3 w-52">
          <div class="shadow bg-base-100 rounded">
            <button
              class="flex items-center w-full p-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <IconMySettingsLogOut />
              <span class="pl-2 text-error">Leave project</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
