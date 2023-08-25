<script setup lang="ts">
import { hexToRgba } from "../../../../helpers/helpers.js";
import { ref } from "vue";

const color = ref<string | null>(null);
const status = ref<string | null>(null);
const props = defineProps(['modelValue'])

const handleStatusOpen = (e) => {
  e.preventDefault();
  const modal: HTMLDialogElement | null = document.querySelector("#my_modal_2");
  if (modal) {
    modal?.showModal();
  }
};

const handleChangeStatus = (c: string, s: string) => {
  color.value = c;
  status.value = s;
};

const handleSaveStatus = (e) => {
  e.preventDefault();
  console.log(props)

};
</script>

<template>
  <button
    class="flex items-center justify-center border rounded px-4 py-2 w-[120px]"
    @click="handleStatusOpen"
  >
    <IconCheck v-if="!color"/>
    <div v-else :style="{ backgroundColor: color}" class="w-3 h-3 rounded"></div>
    <span class="pl-2 text-sm font-medium">{{ (status === null) ? 'Status' : status }}</span>
  </button>
  <dialog id="my_modal_2" class="modal">
    <form
      method="dialog"
      class="flex flex-col justify-between w-[300px] h-[400px] mr-[170px] bg-base-100 rounded shadow-lg"
    >
      <div class="flex items-center justify-between border-b p-3">
        <span>Status</span>
        <button>
          <IconClose />
        </button>
      </div>
      <div>
        <div class="flex p-2">
          <label class="label cursor-pointer">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-blue-100"
              @change="handleChangeStatus('#8DBED8', 'New')"
            />
          </label>
          <div
            :style="{ backgroundColor: hexToRgba('#8DBED8', 0.1) }"
            class="w-full h-auto flex items-center p-2"
          >
            <div class="w-5 h-5 bg-blue-100"></div>
            <span class="pl-3">New</span>
          </div>
        </div>
        <div class="flex p-2">
          <label class="label cursor-pointer">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-red-100"
              @change="handleChangeStatus('#ED7668', 'In work')"
            />
          </label>
          <div
            :style="{ backgroundColor: hexToRgba('#ED7668', 0.1) }"
            class="w-full h-auto flex items-center p-2"
          >
            <div class="w-5 h-5 bg-red-100"></div>
            <span class="pl-3">In work</span>
          </div>
        </div>
        <div class="flex p-2">
          <label class="label cursor-pointer">
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-green-100"
              @change="handleChangeStatus('#7EC770', 'Done')"
            />
          </label>
          <div
            :style="{ backgroundColor: hexToRgba('#7EC770', 0.1) }"
            class="w-full h-auto flex items-center p-2"
          >
            <div class="w-5 h-5 bg-green-100"></div>
            <span class="pl-3">Done</span>
          </div>
        </div>
      </div>
      <div class="modal-action p-3">
        <button class="btn w-full" @click="handleSaveStatus">
          <IconPlus />
          <span class="text-primary">Save status</span>
        </button>
      </div>
    </form>
  </dialog>
</template>
