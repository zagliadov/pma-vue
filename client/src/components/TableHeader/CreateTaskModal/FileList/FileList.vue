<script setup lang="ts">
import { bytesToMegabytes } from "@/helpers/helpers";
import { ref } from "vue";

const { fileArray } = defineProps(["fileArray"]);
const emit = defineEmits(["update:fileArray"]);

const handleRemoveFile = (e: any, name: string, array: File) => {
  e.preventDefault();
  const updatedFiles: File[] = array.filter((file: File) => file.name !== name);
  emit("update:fileArray", updatedFiles);
};

</script>

<template>
  <div class="flex items-center justify-center flex-wrap px-6 pb-3">
    <div v-for="(file, index) in fileArray" :key="file.name" class="flex flex-col p-1">
      <div
        class="flex flex-col justify-around border border-base-200 rounded w-[150px] h-[100px]"
      >
        <span class="text-xs pl-5">{{ file.name }}</span>
        <div class="flex items-center justify-around">
          <div class="flex">
            <IconPaperclipNotification />
            <span class="text-xs text-gray-400 pl-2">{{
              bytesToMegabytes(file.size) + " MB"
            }}</span>
          </div>
          <button @click="handleRemoveFile($event, file.name, fileArray)">
            <IconTrashNotification />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
