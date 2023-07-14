<script setup lang="ts">
import { ref } from "vue";
import { useDiffStore } from "@/store/modules/difference";
import { useWorkspaceStore } from "@/store/modules/workspace";
import { storeToRefs } from "pinia";

const diff = useDiffStore();
const space = useWorkspaceStore();
const { createWorkspace, getWorkspaces } = space;
const { workspaceRegex, errorMessage, errorStatus, successStatus, workspaces } =
  storeToRefs(space);
const { setIsSideMenuOpen } = diff;
const isSpaceOpen = ref<boolean>(false);
const isCreateSpace = ref<boolean>(false);
const newWorkspaceName = ref<string>("");

const handleSpaceOpen = async () => {
  isSpaceOpen.value = !isSpaceOpen.value;
  isCreateSpace.value = false;
  await getWorkspaces();
};

const handleOpenSpaceCreation = () => {
  isCreateSpace.value = !isCreateSpace.value;
};

const handleCreateNewSpace = async () => {
  errorStatus.value = 0;
  errorMessage.value = "";
  if (workspaceRegex.value.test(newWorkspaceName.value)) {
    await createWorkspace(newWorkspaceName.value);
    if (successStatus.value === 200) {
      newWorkspaceName.value = "";
      isCreateSpace.value = false;
    }
    if (errorStatus.value === 400) return;
  }
};
</script>

<template>
  <div class="w-[400px] h-screen border-r absolute bg-white">
    <div class="flex justify-between items-center px-4 py-2 border-b h-[56px]">
      <div class="flex items-center">
        <IconCheckCircle />
        <span class="pl-1 font-medium">SAAS MVP</span>
      </div>

      <button class="flex items-center rotate-180" @click="setIsSideMenuOpen">
        <IconSideMenu />
      </button>
    </div>
    <div class="px-4 py-6">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="border-2 border-neutral rounded-full w-5 h-5"></div>
          <span class="pl-1">Your spaces</span>
        </div>

        <div class="pr-3">
          <button
            @click="handleSpaceOpen"
            class="flex items-center"
            :class="{ 'rotate-180': isSpaceOpen }"
          >
            <IconChevron />
          </button>
        </div>
      </div>
      <button
        v-if="isSpaceOpen"
        class="flex items-center pt-3 pl-5"
        @click="handleOpenSpaceCreation"
      >
        <IconPlus />
        <span class="font-lg font-medium pl-2 text-primary">New space</span>
      </button>

      <div
        class="flex relative form-control w-full max-w-xs pr-8 pl-6"
        v-if="isCreateSpace"
      >
        <CustomInput
          v-model="newWorkspaceName"
          placeholder="Type here"
          name="Enter a name for the new workspace"
        />
        <label class="label">
          <span
            v-if="errorStatus === 400"
            class="label-text-alt absolute text-error pt-1"
            >{{ errorMessage }}</span
          >
        </label>
        <button
          @click="handleCreateNewSpace"
          class="absolute right-0 top-8 border-2 rounded-full border-neutral-content"
          :class="{ 'border-primary': workspaceRegex.test(newWorkspaceName) }"
        >
          <IconPlus
            :class="{
              'stroke-neutral-content': !workspaceRegex.test(newWorkspaceName),
            }"
          />
        </button>
      </div>

      <div v-if="isSpaceOpen" class="pt-4">
        <div v-for="workspace in workspaces">
          {{ workspace.name }}
        </div>
      </div>
    </div>
  </div>
</template>
