<script setup lang="ts">
import { ref } from "vue";
import StatusModal from "./StatusModal/StatusModal.vue";
import AssigneeModal from "./AssigneeModal/AssigneeModal.vue";

const taskName = ref<string>("");
const taskDescription = ref<string>("");
const taskColor = ref<string>("");
const taskStatus = ref<string>("");
const taskAssignee = ref<string[]>([]);

const handleShowModalAddTask = () => {
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_1");
  if (modal) {
    modal?.showModal();
  }
};

const handleDrop = (e: any) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    console.log(files, "files");
  }
};

const handleTaskCreate = (e: any) => {
  e.preventDefault();
  console.log(
    taskName.value,
    taskDescription.value,
    taskStatus.value,
    taskColor.value
  );
  console.log("taskAssignee=====================>", taskAssignee);
};
</script>

<template>
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
          <StatusModal
            v-model:taskStatus="taskStatus"
            v-model:taskColor="taskColor"
          />
          <div class="ml-5 h-6 pl-5 border-l"></div>
          <AssigneeModal v-model:taskAssignee="taskAssignee" />
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
            <span class="pl-2 text-base-300"
              >Drop files to attach or<span
                class="font-medium text-primary pl-2"
                >browse</span
              ></span
            >
          </div>
        </div>
      </div>
      <div class="modal-action px-4 py-2">
        <button class="btn">Cancel</button>
        <button class="btn btn-success" @click="handleTaskCreate">
          Create
        </button>
      </div>
    </form>
  </dialog>
</template>
