<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import {
  capitalizeFirstLetter,
  getEmailFromCurrentPath,
} from "@/helpers/helpers";
import { API_URL } from "@/helpers/constants";
import { storeToRefs } from "pinia";
import { useProjectStore } from "@/store/modules/project";
import type { IProject } from "@/store/interfaces";
import { useAssigneeStore } from "@/store/modules/assignee";
import { ref } from "vue";

const projectStore = useProjectStore();
const assigneeStore = useAssigneeStore();
const { membersCount, members } = storeToRefs(assigneeStore);
const { project } = storeToRefs(projectStore);
const { editProjectName, deleteProject } = projectStore;
const { description, id } = project.value as IProject;
const router = useRouter();
const hoveredMember = ref<string | null>(null);
const newProjectName = ref<string>(project.value?.name as string);
const deleteProjectName = ref<string>("");

const handleProjectNameEditModal = () => {
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_1");
  if (modal) {
    modal?.showModal();
  }
};

const handleEditProjectName = async () => {
  if (newProjectName.value === "" && project.value?.name) {
    newProjectName.value = project.value.name;
  }
  if (newProjectName.value === project.value?.name) {
    return;
  }
  await editProjectName(newProjectName.value.trim(), id);
};

const handleProjectDeleteModal = () => {
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_2");
  if (modal) {
    modal?.showModal();
  }
};

const handleDeleteProject = async () => {
  if (deleteProjectName.value.trim() === project.value?.name) {
    await deleteProject(id).then(() => {
      router.push(`/my_settings/${getEmailFromCurrentPath(router)}/projects`);
    });
  }
};
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
        <span class="font-medium text-2xl pr-4">{{
          project && project.name
        }}</span>
        <button @click="handleProjectNameEditModal">
          <IconEdit />
        </button>
        <dialog id="my_modal_1" class="modal">
          <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg pb-4">Edit project name!</h3>
            <CustomInput
              v-model="newProjectName"
              placeholder="Type here"
              name="Enter a name for the project"
            />
            <div class="modal-action">
              <button class="btn">Close</button>
              <button class="btn" @click="handleEditProjectName">Save</button>
            </div>
          </form>
        </dialog>
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
              v-if="!firstName"
              class="flex items-center justify-center w-10 h-10 bg-neutral-content rounded-full"
            >
              <span v-if="firstName && !avatar_filename"
                >{{ capitalizeFirstLetter(firstName) }}
              </span>
              <span v-else-if="!avatar_filename"
                >{{ capitalizeFirstLetter(email) }}
              </span>
            </div>
            <div
              v-if="firstName"
              class="flex items-center justify-center w-10 h-10 bg-neutral-content rounded-full"
              :style="{
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundImage: `url('${API_URL}/user/user_avatar/${avatar_filename}')`,
              }"
            ></div>
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
            <button
              class="btn btn-error text-error-content text-opacity-50"
              @click="handleProjectDeleteModal"
            >
              Delete project
            </button>
            <dialog id="my_modal_2" class="modal">
              <form method="dialog" class="modal-box">
                <h3 class="font-bold text-lg pb-4">
                  Are you sure you want to delete the project?
                </h3>
                <CustomInput
                  v-model="deleteProjectName"
                  placeholder="Type here"
                  name="Enter project name:"
                />
                <div class="modal-action">
                  <button class="btn">Close</button>
                  <button class="btn btn-error" @click="handleDeleteProject">
                    Delete
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  </MySettingsLayout>
</template>
