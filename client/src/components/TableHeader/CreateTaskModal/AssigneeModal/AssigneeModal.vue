<script setup lang="ts">
import { capitalizeFirstLetter } from "@/helpers/helpers";
import { useAssigneeStore } from "@/store/modules/assignee";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { taskAssignee } = defineProps<{
  taskAssignee: string[];
}>();
const emit = defineEmits(["update:taskAssignee"]);
const assigneeStore = useAssigneeStore();
const { getAllAssignee } = assigneeStore;
const { members } = storeToRefs(assigneeStore);
const arr = ref<string[]>([]);

const handleAssigneeModalOpen = async (e: any) => {
  e.preventDefault();
  await getAllAssignee();
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_3");
  if (modal) {
    modal?.showModal();
  }
};

const handleAddAssignee = (e: any, email: string) => {
  e.preventDefault();
  arr.value.push(email);
  emit("update:taskAssignee", arr.value);
};

const handleClick = (e: any) => {
  e.preventDefault();
  console.log(taskAssignee);
};
</script>

<template>
  <button
    class="ml-5 flex items-center justify-center border rounded px-4 py-2 w-[120px]"
    @click="handleAssigneeModalOpen"
  >
    <IconMySettingsUser />
    <span class="pl-2 text-sm font-medium text-neutral">Assignee</span>
  </button>
  <dialog id="my_modal_3" class="modal">
    <form
      method="dialog"
      class="flex flex-col justify-between w-[300px] h-[400px] ml-[160px] bg-base-100 rounded shadow-lg"
    >
      <div class="flex items-center justify-between border-b p-3">
        <span>Assignee</span>
        <button @click="handleClick">
          <IconClose />
        </button>
      </div>
      <div>
        <div
          v-for="{ email, avatar_filename, firstName, lastName } in members"
          :key="email"
          class="p-2"
        >
          <div class="flex items-center">
            <div
              :style="{
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundImage: avatar_filename
                  ? `url(http://localhost:9002/user/user_avatar/${avatar_filename})`
                  : 'none',
              }"
              class="flex items-center justify-center w-10 h-10 border rounded-full"
            >
              <span>
                {{ !avatar_filename ? capitalizeFirstLetter(email) : "" }}
              </span>
            </div>
            <button
              @click="(e) => handleAddAssignee(e, email)"
              class="pt-2 pl-2"
            >
              <span>{{ email }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="modal-action p-3">
        <button class="btn">Close</button>
      </div>
    </form>
  </dialog>
</template>
