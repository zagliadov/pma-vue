<script setup lang="ts">
import {
  getEmailFromCurrentPath,
  capitalizeFirstLetter,
} from "../../../helpers/helpers";
import { useProjectStore } from "../../../store/modules/project";
import { useRouter } from "vue-router";
import { ref } from "vue";
import DeleteUniqProject from "./DeleteUniqProject.vue";

const projectStore = useProjectStore();
const router = useRouter();
const hoveredProjectId = ref<number | null>(null);
</script>

<template>
  <div
    v-for="{ id, name } in projectStore?.allProjects"
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
            <RouterLink
              :to="`/my_settings/${getEmailFromCurrentPath(
                router
              )}/projects/edit_project/${id}`"
              class="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <IconEdit />
              <span class="pl-2">Edit project</span>
            </RouterLink>
            <DeleteUniqProject :name="name" :id="id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
