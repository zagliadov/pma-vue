<script setup lang="ts">
import { capitalizeFirstLetter } from "@/helpers/helpers";
import { API_URL } from "@/helpers/constants";
import { useAssigneeStore } from "@/store/modules/assignee";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import type { ITaskAssignee } from "../../../../store/interfaces.ts";


const { taskAssignee } = defineProps<{
  taskAssignee: ITaskAssignee[];
}>();
const emit = defineEmits(["update:taskAssignee"]);
const assigneeStore = useAssigneeStore();
const { getAllAssignee } = assigneeStore;
const { members } = storeToRefs(assigneeStore);
const membersArray = ref<ITaskAssignee[]>([]);

const handleAssigneeModalOpen = async (e: any) => {
  e.preventDefault();
  await getAllAssignee();
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_3");
  if (modal) {
    modal?.showModal();
  }
};

const handleAddAssignee = (e: any, member: ITaskAssignee) => {
  e.preventDefault();
  if (!membersArray.value) return;
  const existingIndex = membersArray.value.findIndex(
    (item) => item.email === member.email
  );

  if (existingIndex !== -1) {
    const updatedArr = membersArray.value.filter(
      (_, index) => index !== existingIndex
    );
    membersArray.value = updatedArr;
  } else {
    const updatedArr = [...membersArray.value, member];
    membersArray.value = updatedArr;
  }
  emit("update:taskAssignee", membersArray.value);
};
</script>

<template>
  <div class="flex items-center">
    <button
      v-if="membersArray && membersArray.length === 0"
      class="flex items-center justify-center border rounded px-4 py-2 h-10 w-[120px]"
      @click="handleAssigneeModalOpen"
    >
      <IconMySettingsUser />
      <span class="pl-2 text-sm font-medium text-neutral">Assignee</span>
    </button>
    <div
      v-else
      class="flex items-center"
      v-for="(member, index) in membersArray"
      :key="member?.email"
    >
      <div
        :style="{
          position: 'relative',
          marginLeft: index === 0 ? '0px' : `${index - 20}px`,
          zIndex: `${index + 2}`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundImage: member?.avatar_filename
            ? `url(${API_URL}/user/user_avatar/${member?.avatar_filename})`
            : 'none',
        }"
        class="flex items-center justify-center w-10 h-10 border rounded-full bg-white"
      >
        <span>
          {{
            !member?.avatar_filename ? capitalizeFirstLetter(member?.email) : ""
          }}
        </span>
      </div>
    </div>
    <button
      v-if="membersArray.length > 0"
      @click="handleAssigneeModalOpen"
      class="flex items-center justify-center w-10 h-10 border rounded-full bg-white relative ml-[-15px] z-50"
    >
      <IconPlus />
    </button>
  </div>

  <dialog id="my_modal_3" class="modal">
    <form
      method="dialog"
      class="flex flex-col justify-between w-[300px] h-[400px] ml-[160px] bg-base-100 rounded shadow-lg"
    >
      <div class="flex items-center justify-between border-b p-3">
        <span>Assignee</span>
        <button>
          <IconClose />
        </button>
      </div>
      <div class="overflow-scroll">
        <div
          v-for="member in members"
          :key="member?.email"
          class="p-2 flex items-center hover:bg-base-300"
        >
          <button
            class="flex items-center"
            @click="handleAddAssignee($event, member)"
          >
            <div
              :style="{
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundImage: member?.avatar_filename
                  ? `url(${API_URL}/user/user_avatar/${member?.avatar_filename})`
                  : 'none',
              }"
              class="flex items-center justify-center w-10 h-10 border rounded-full"
            >
              <span>
                {{
                  !member?.avatar_filename
                    ? capitalizeFirstLetter(member?.email)
                    : ""
                }}
              </span>
            </div>
            <div class="pl-2">
              <span>{{ member?.email }}</span>
            </div>
          </button>
          <div v-for="item in membersArray" class="flex items-center">
            <IconCheck v-if="item?.email === member?.email" />
          </div>
        </div>
      </div>
      <div class="modal-action p-3">
        <button class="btn">Close</button>
      </div>
    </form>
  </dialog>
</template>
