<script setup lang="ts">
import { useProjectStore } from "@/store/modules/project";
import { useAssigneeStore } from "@/store/modules/assignee";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { capitalizeFirstLetter } from "@/helpers/helpers";
import { RouterLink } from "vue-router";

const projectStore = useProjectStore();
const assigneeStore = useAssigneeStore();
const { totalProjectsCount, allProjects } = storeToRefs(projectStore);
const { assigneeProjects } = storeToRefs(assigneeStore);
const hoveredProjectId = ref<number | null>(null);
const hoveredAssigneeProjectId = ref<number | null>(null);
</script>

<template>
  <MySettingsLayout>
    <div>
      <div class="flex flex-col border-b pb-10">
        <span class="font-medium text-2xl">Projects</span>
        <span class="pt-6 pb-6 font-medium text-lg"
          >Your projects ({{ totalProjectsCount }})
        </span>
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
          <div v-if="hoveredProjectId === id" class="pr-4">
            <div className="dropdown dropdown-end">
              <button class="border border-gray-300 rounded p-2">
                <IconMoreVerticalSettings />
              </button>
              <div tabIndex="{0}" class="dropdown-content z-[1] menu p-3 w-52">
                <div class="shadow bg-base-100 rounded">
                  <RouterLink
                    :to="``"
                    class="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50"
                  >
                    <IconEdit />
                    <span class="pl-2">Edit project</span>
                  </RouterLink>
                  <RouterLink
                    :to="``"
                    class="flex items-center p-3 hover:bg-gray-50"
                  >
                    <IconTrashNotification class="stroke-error" />
                    <span class="pl-2 text-error">Delete project</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-4">
          <button class="btn btn-outline btn-success">
            <span class="">Add new project</span>
          </button>
        </div>
      </div>
      <div class="flex flex-col pt-10">
        <span class="pt-6 pb-6 font-medium text-lg"
          >Your members ({{ assigneeProjects.length }})
        </span>
        <div
          v-for="{ id, name } in assigneeProjects"
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
      </div>
    </div>
  </MySettingsLayout>
</template>
