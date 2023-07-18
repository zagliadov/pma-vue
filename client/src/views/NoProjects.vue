<script setup lang="ts">
import { useProjectStore } from "../store/modules/project";
import { useDiffStore } from "@/store/modules/difference";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore();
const differenceStore = useDiffStore();
const { isSideMenuOpen } = storeToRefs(differenceStore);
const { openCreateProjectModal } = projectStore;
const { isCreateProjectModal } = storeToRefs(projectStore);

const handleOpenModal = () => {
  openCreateProjectModal();
};
</script>

<template>
  <div
    class="hero h-full bg-white"
    :class="{
      'bg-base-200 blur-sm': isSideMenuOpen,
      'bg-base-200': isCreateProjectModal,
    }"
  >
    <div class="hero-content text-center" v-if="!isCreateProjectModal">
      <div class="max-w-md">
        <div class="flex justify-center pb-6">
          <IconNoProject />
        </div>

        <h1 class="text-5xl font-bold">Create project</h1>
        <p class="py-6">
          Create your first project. Create tasks and subtasks. Mark who will
          perform the task and when. View tasks in table or timeline mode
        </p>
        <button class="btn btn-primary" @click="handleOpenModal">
          <IconPlus class="stroke-primary-content" />
          <span>Create project</span>
        </button>
      </div>
    </div>

    <CreateProjectModal v-if="isCreateProjectModal" />
  </div>
</template>
