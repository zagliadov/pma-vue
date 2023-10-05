<script setup lang="ts">
import { ref } from "vue";
import { useAssigneeStore } from "@/store/modules/assignee";

const assigneeStore = useAssigneeStore();
const { addNewAssignee } = assigneeStore
const { projectId } = defineProps(["projectId"]);
const newAssigneeEmail = ref<string>("");

const handleAddAssignee = async (projectId: number, newAssigneeEmail: string) => {
  await addNewAssignee(projectId, newAssigneeEmail);
};

const handleOpenModal = () => {
  const modal: HTMLDialogElement | null =
    document.querySelector("#add_new_assignee");
  if (modal) modal?.showModal();
};
</script>

<template>
  <div class="px-4 py-2">
    <button class="btn w-full bg-green-50" @click="handleOpenModal">
      <IconPlus />
      <span class="text-primary">Add members</span>
    </button>
    <dialog id="add_new_assignee" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg pb-4">Add a new assignee</h3>
        <div class="flex relative form-control w-full">
          <CustomInput
            v-model="newAssigneeEmail"
            placeholder="Type here"
            name="Enter the email address of the new assignee"
          />
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
            <button
              class="btn btn-primary ml-3"
              @click="handleAddAssignee(projectId, newAssigneeEmail)"
            >
              Add a new assignee
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
