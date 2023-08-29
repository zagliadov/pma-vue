<script setup lang="ts">
import { bytesToMegabytes } from "@/helpers/helpers";
const { taskFileArray } = defineProps<{
  taskFileArray: any;
}>();
const emit = defineEmits(["update:taskFileArray"]);
</script>

<template>
  <div class="flex items-center px-6 pb-3">
    <div v-for="(file, index) in taskFileArray" class="flex flex-col p-1">
      <div class="border border-base-200 rounded w-[150px] h-[100px]">
        <span class="text-xs">{{ file.name }}</span>
        <div class="flex items-center">
          <div class="flex">
            <IconPaperclipNotification />
            <span class="text-xs text-gray-400 pl-2">{{ bytesToMegabytes(file.size) + " MB" }}</span>
          </div>
          <IconTrashNotification />
        </div>
      </div>
    </div>
  </div>
</template>
