<script setup lang="ts">
import { ref } from "vue";

const localFileArray = ref<any>([]);
const { taskFileArray } = defineProps<{
  taskFileArray: any
}>();
const emit = defineEmits(["update:taskFileArray"]);

const handleDrop = async (e: any) => {
  e.preventDefault();
  const file = e.target.files[0];
  emit("update:taskFileArray", file);
};

const handleUploadFile = async (e: any) => {
  e.preventDefault();
  const file = e.target.files[0];
  localFileArray.value.push(file);
  emit("update:taskFileArray", localFileArray.value);
};
</script>

<template>
  <div class="px-6">
    <div
      class="flex items-center justify-center border border-dashed p-4"
      @dragover.prevent
      @drop="handleDrop"
    >
      <IconUploadCloud />
      <span class="pl-2 text-base-300">
        Drop files to attach or
        <label htmlFor="upload-photo">
          <span class="font-medium text-primary cursor-pointer"> browse </span>

          <input
            type="file"
            ref="inputFile"
            @change="handleUploadFile"
            id="upload-photo"
            accept=".zip"
            class="hidden"
          />
        </label>
      </span>
    </div>
  </div>
</template>
