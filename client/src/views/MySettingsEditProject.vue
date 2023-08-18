<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import {
  capitalizeFirstLetter,
  getEmailFromCurrentPath,
} from "@/helpers/helpers";
import { storeToRefs } from "pinia";
import { useProjectStore } from "@/store/modules/project";
import type { IProject } from "@/store/interfaces";
import { useAssigneeStore } from "@/store/modules/assignee";
import { ref } from "vue";

const projectStore = useProjectStore();
const assigneeStore = useAssigneeStore();
const { membersCount, members } = storeToRefs(assigneeStore);
const { project } = storeToRefs(projectStore);
const { name = "", description } = project.value as IProject;
const router = useRouter();
const hoveredMember = ref<string | null>(null);
</script>

<template>
  <MySettingsLayout>
    <div>
      <div class="flex">
        <RouterLink
          :to="`/my_settings/${getEmailFromCurrentPath(router)}/projects`"
          class="flex items-center px-5 py-2 border border-gray-100 rounded hover:bg-gray-50"
        >
          <IconLeftArrow />
          <span class="pl-3 font-medium text-sm text-gray-600"
            >Back to list</span
          >
        </RouterLink>
      </div>
      <div class="py-10 border-b">
        <span class="font-medium text-2xl pr-4">{{ name }}</span>
        <button>
          <IconEdit />
        </button>
        <div class="pt-5 max-w-[1000px]">
          <p class="text-gray-600">
            {{ description }}
          </p>
        </div>
      </div>
      <div class="pt-10">
        <div class="flex items-center justify-between">
          <span class="font-medium"> Members ({{ membersCount }}) </span>
          <button class="btn btn-primary">
            <IconPlus class="stroke-base-100" />
            <span>add members</span>
          </button>
        </div>

        <div
          v-for="{ email, avatar_filename, firstName, lastName } in members"
          class="flex items-center justify-between rounded p-2 mt-4 hover:bg-base-200"
          @mouseenter="hoveredMember = email"
          @mouseleave="hoveredMember = null"
        >
          <div className="flex items-center">
            <div
              class="flex items-center justify-center w-10 h-10 bg-neutral-content rounded-full"
              :style="{
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundImage: `url('http://localhost:9002/user/user_avatar/${avatar_filename}')`,
              }"
            >
              <span v-if="firstName && !avatar_filename"
                >{{ capitalizeFirstLetter(firstName) }}
              </span>
              <span v-else-if="!avatar_filename"
                >{{ capitalizeFirstLetter(email) }}
              </span>
            </div>
            <span class="pl-5"
              >{{ firstName || email }} {{ lastName || "" }}</span
            >
          </div>

          <button v-if="hoveredMember === email"><IconClose /></button>
        </div>

        <div class="flex flex-col pt-10">
          <span class="font-medium">Manage project</span>
          <span class="text-sm text-gray-600 pt-5"
            >Deleting a project is an irreversible action. After deleting the
            project, all data will be lost</span
          >
          <div class="pt-5">
            <button class="btn btn-error text-error-content text-opacity-50">
              Delete project
            </button>
          </div>
        </div>
      </div>
    </div>
  </MySettingsLayout>
</template>
