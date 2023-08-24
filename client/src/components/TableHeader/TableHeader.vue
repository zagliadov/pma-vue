<script setup lang="ts">
import { ref } from "vue";

const taskName = ref<string>("");
const taskDescription = ref<string>("");

const handleShowModalAddTask = () => {
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_1");
  if (modal) {
    modal?.showModal();
  }
};
const handleStatusOpen = (e) => {
  e.preventDefault();
};
const handleAssigneeOpen = (e) => {
  e.preventDefault();
};
const handleDrop = (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    console.log(files, "files");
  }
};
</script>

<template>
  <div class="p-2">
    <button
      @click="handleShowModalAddTask"
      class="flex items-center bg-success-content px-3 py-2 rounded"
    >
      <IconPlus class="stroke-base-100" />
      <span class="text-base-100 pl-2">Task</span>
    </button>
    <dialog id="my_modal_1" class="modal">
      <form method="dialog" class="w-7/12 bg-base-100 rounded shadow-lg">
        <div class="border-b p-4">
          <div class="flex items-center justify-between">
            <span>Create task</span>
            <button>
              <IconClose />
            </button>
          </div>
        </div>
        <div>
          <div class="w-full px-6 pt-10">
            <input
              v-model="taskName"
              type="text"
              placeholder="Enter task name..."
              class="input rounded border border-base-200 w-full focus:outline-none"
            />
          </div>
          <div class="flex items-center px-6 py-3">
            <button
              class="flex items-center border rounded px-4 py-2"
              @click="handleStatusOpen"
            >
              <IconCheck />
              <span class="pl-2 text-sm font-medium">Status</span>
            </button>

            <div class="ml-5 h-6 border"></div>
            <button
              class="flex items-center border rounded px-4 py-2 ml-5"
              @click="handleAssigneeOpen"
            >
              <IconMySettingsUser />
              <span class="pl-2 text-sm font-medium text-neutral"
                >Assignee</span
              >
            </button>
          </div>

          <div class="w-full px-6 pb-4 h-auto">
            <textarea
              v-model="taskDescription"
              type="textarea"
              placeholder="Enter task description..."
              class="textarea textarea-lg w-full focus:outline-none rounded bg-gray-100"
            ></textarea>
          </div>
          <div class="px-6">
            <div
              class="flex items-center justify-center border border-dashed p-4"
              @dragover.prevent
              @drop="handleDrop"
            >
              <IconUploadCloud />
              <span class="pl-2 text-base-300">Drop files to attach or<span class="font-medium text-primary pl-2">browse</span></span>
            </div>
          </div>
        </div>
        <div class="modal-action px-4 py-2">
          <button class="btn">Cancel</button>
          <button class="btn btn-success">Create</button>
        </div>
      </form>
    </dialog>
  </div>
</template>
