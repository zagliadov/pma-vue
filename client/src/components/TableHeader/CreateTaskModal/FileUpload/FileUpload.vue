<script setup lang="ts">
import { ref } from "vue";

const localFileArray = ref<File[]>([]);
defineProps<{
  fileArray: File[];
}>();
const emit = defineEmits(["update:fileArray"]);

const handleDrop = async (e: any) => {
  e.preventDefault();
  const file = e.target.files[0];
  const existingFile = localFileArray.value.find(
    (f: File) => f.name === file.name
  );
  if (!existingFile) {
    localFileArray.value.push(file);
    emit("update:fileArray", localFileArray.value);
  }
};

const handleUploadFile = async (e: any) => {
  e.preventDefault();
  const file = e.target.files[0];
  const existingFile = localFileArray.value.find(
    (f: File) => f.name === file.name
  );
  if (!existingFile) {
    localFileArray.value.push(file);
    emit("update:fileArray", localFileArray.value);
  }
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
