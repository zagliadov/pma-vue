<script setup lang="ts">
import ProjectName from "./ProjectName.vue";
import { useProjectStore } from "../../../store/modules/project";
import { ref } from "vue";

const projectStore = useProjectStore();
const { editProjectName } = projectStore;
const newProjectName = ref<string>(projectStore.project?.name as string);
const handleProjectNameEditModal = () => {
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_1");
  if (modal) modal?.showModal();
};

const handleEditProjectName = async () => {
  if (
    newProjectName.value === "" &&
    projectStore.project &&
    projectStore.project.name
  ) {
    newProjectName.value = projectStore.project.name;
  }
  if (
    projectStore.project &&
    newProjectName.value === projectStore.project.name
  ) {
    return;
  }
  if (!!projectStore.project) {
    await editProjectName(newProjectName.value.trim(), projectStore.project.id);
  }
};
</script>

<template>
  <div class="py-10 border-b">
    <ProjectName
      v-if="projectStore.project"
      :name="projectStore.project.name"
      :handleProjectNameEditModal="handleProjectNameEditModal"
    />
    

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
        {{ projectStore.project && projectStore.project.description }}
      </p>
    </div>
  </div>
</template>
