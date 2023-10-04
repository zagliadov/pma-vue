<script setup lang="ts">
import { useWorkspaceStore } from "../../../store/modules/workspace";
import { getEmailFromCurrentPath } from "../../../helpers/helpers";
import { useRouter } from "vue-router";

const workspaceStore = useWorkspaceStore();
const { getWorkspaces } = workspaceStore;
const router = useRouter();

const handleOpenModal = async () => {
  await getWorkspaces();
  const modal: HTMLDialogElement | null = document.querySelector(
    "#my_modal_settings_add_new_project"
  );
  if (modal) modal?.showModal();
};

const createProject = async (workspaceId: number) => {
  router.push(`/${getEmailFromCurrentPath(router)}/workspace/${workspaceId}/create_project`)
}
</script>

<template>
  <div class="pt-4">
    <button class="btn btn-outline btn-success" @click="handleOpenModal">
      <span class="">Add new project</span>
    </button>
    <dialog id="my_modal_settings_add_new_project" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg text-center pb-3">Select workspace</h3>
        <div
          v-for="{ id, name } in workspaceStore.workspaces"
          :key="id"
          class="flex flex-wrap justify-between px-10"
        >
          <div class="tooltip m-1" :data-tip="name">
            <button class="btn w-[150px]" @click="createProject(id)">
              <span class="truncate">{{ name }}</span>
            </button>
          </div>
        </div>
        <div class="modal-action pt-3">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
