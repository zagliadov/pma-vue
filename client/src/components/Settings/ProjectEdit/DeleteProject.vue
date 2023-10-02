<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProjectStore } from "../../../store/modules/project";
import { getEmailFromCurrentPath } from "../../../helpers/helpers";

const projectStore = useProjectStore();
const { deleteProject } = projectStore;
const deleteProjectName = ref<string>("");
const router = useRouter();
const handleProjectDeleteModal = () => {
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_2");
  if (modal) modal?.showModal();
};

const handleDeleteProject = async () => {
  if (deleteProjectName.value.trim() === projectStore?.project?.name) {
    await deleteProject(projectStore?.project?.id).then(() => {
      router.push(`/my_settings/${getEmailFromCurrentPath(router)}/projects`);
    });
  }
};
</script>

<template>
  <div class="flex flex-col pt-10">
    <span class="font-medium">Manage project</span>
    <span class="text-sm text-gray-600 pt-5"
      >Deleting a project is an irreversible action. After deleting the project,
      all data will be lost</span
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
</template>
