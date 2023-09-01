<script setup lang="ts">
import { ref } from "vue";
import { getRouteParams } from "../../../helpers/helpers";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTaskStore } from "@/store/modules/task";
import { useAuthStore } from "@/store/modules/auth";
import StatusModal from "./StatusModal/StatusModal.vue";
import AssigneeModal from "./AssigneeModal/AssigneeModal.vue";
import FileUpload from "./FileUpload/FileUpload.vue";
import FileList from "./FileList/FileList.vue";
import type { IExistingUser, ITaskAssignee } from "@/store/interfaces";

const router = useRouter();
const { projectId } = getRouteParams(router);
const authStore = useAuthStore();
const { existingUser } = storeToRefs(authStore);
const { email } = existingUser.value as IExistingUser;
const taskName = ref<string>("");
const taskDescription = ref<string>("");
const taskColor = ref<string>("");
const taskStatus = ref<string>("");
const taskAssignee = ref<ITaskAssignee[]>([]);
const taskFileArray = ref<File[]>([]);
const taskStore = useTaskStore();
const { createTask } = taskStore;

const handleShowModalAddTask = () => {
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_1");
  if (modal) {
    modal?.showModal();
  }
};

const handleTaskCreate = async (e: any) => {
  e.preventDefault();
  if (
    taskName.value.length === 0 ||
    taskDescription.value.length === 0 ||
    taskColor.value.length === 0 ||
    taskStatus.value.length === 0 ||
    taskAssignee.value.length === 0 ||
    taskFileArray.value.length === 0

  ) {
    console.error("Please fill in all required fields.");
    return;
  } else {
    await createTask({
      taskName: taskName.value,
      taskDescription: taskDescription.value,
      taskColor: taskColor.value,
      taskStatus: taskStatus.value,
      taskAssignee: taskAssignee.value,
    }, projectId, email, taskFileArray.value);
  }
};
</script>

<template>
  <button
    @click="handleShowModalAddTask"
    class="flex items-center bg-primary px-3 py-2 rounded"
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
        <FileList v-model:fileArray="taskFileArray" />
        <FileUpload v-model:fileArray="taskFileArray" />
      </div>
      <div class="modal-action px-4 py-2">
        <button class="btn">Cancel</button>
        <button class="btn btn-primary" @click="handleTaskCreate">
          Create
        </button>
      </div>
    </form>
  </dialog>
</template>
