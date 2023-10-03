<script setup lang="ts">
import { ref } from "vue";
import { useProjectStore } from "@/store/modules/project";

const { name, id } = defineProps<{
  name: string;
  id: number;
}>();
const projectStore = useProjectStore();
const { deleteProject } = projectStore;
const deleteProjectName = ref<string>("");

const handleProjectDeleteModal = async () => {
  const modal: HTMLDialogElement | null =
    document.querySelector("#uniq_project");
  if (modal) modal?.showModal();
};

const handleDeleteProject = async () => {
  if (deleteProjectName.value.trim() === name) {
    await deleteProject(Number(id));
  }
};
</script>

<template>
  <button
    class="flex items-center p-3 hover:bg-gray-50"
    @click="handleProjectDeleteModal"
  >
    <IconTrashNotification class="stroke-error" />
    <span class="pl-2 text-error">Delete project</span>
  </button>
  <dialog id="uniq_project" class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-lg pb-4">
        Are you sure you want to delete the project?
      </h3>
      <div class="py-4">
        <CustomInput
          v-model="deleteProjectName"
          placeholder="Type here"
          :name="`If you want to delete a project, enter the project name: ${name}`"
        />
      </div>

      <div class="flex flex-col">
        <div class="modal-action pb-2">
          <button class="btn w-full">Close</button>
        </div>
      </div>
      <button class="btn btn-error" @click="handleDeleteProject">Delete</button>
    </form>
  </dialog>
</template>
