<script setup lang="ts">
import { ref } from "vue";
import { useWorkspaceStore } from "@/store/modules/workspace";

const { isCreateSpace, errorStatus, errorMessage, handleCreateNewSpace } =
  defineProps<{
    isCreateSpace: boolean;
    errorStatus: number;
    errorMessage: string;
    handleCreateNewSpace: Function;
  }>();
const newWorkspaceName = ref<string>("");
const workspaceStore = useWorkspaceStore();
</script>

<template>
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
      @click="handleCreateNewSpace(newWorkspaceName)"
      class="absolute right-0 top-8 border-2 rounded-full border-neutral-content"
      :class="{
        'border-primary': workspaceStore.workspaceRegex.test(newWorkspaceName),
      }"
    >
      <IconPlus
        :class="{
          'stroke-neutral-content':
            !workspaceStore.workspaceRegex.test(newWorkspaceName),
        }"
      />
    </button>
  </div>
</template>
