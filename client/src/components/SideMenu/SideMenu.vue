<script setup lang="ts">
import { ref } from "vue";
import { useWorkspaceStore } from "@/store/modules/workspace";
import { storeToRefs } from "pinia";
import WorkspaceList from "./WorkspaceList/WorkspaceList.vue";
import AssigneeProjectList from "./AssigneeProjectList/AssigneeProjectList.vue";
import OpenSpaceButton from "./OpenSpaceButton.vue";
import SideMenuHeader from "./SideMenuHeader.vue";
import SpaceCreationButton from "./SpaceCreationButton.vue";
import NewWorkspaceForm from "./NewWorkspaceForm.vue";
const space = useWorkspaceStore();
const { createWorkspace, getWorkspaces } = space;
const { workspaceRegex, errorMessage, errorStatus, successStatus } =
  storeToRefs(space);
const isSpaceOpen = ref<boolean>(false);
const isCreateSpace = ref<boolean>(false);

const handleSpaceOpen = async () => {
  isSpaceOpen.value = !isSpaceOpen.value;
  isCreateSpace.value = false;
  await getWorkspaces();
};

const handleOpenSpaceCreation = () => {
  isCreateSpace.value = !isCreateSpace.value;
};

const handleCreateNewSpace = async (newWorkspaceName: any) => {
  errorStatus.value = 0;
  errorMessage.value = "";
  if (workspaceRegex.value.test(newWorkspaceName)) {
    console.log(newWorkspaceName, "asdf");
    await createWorkspace(newWorkspaceName);
    if (successStatus.value === 200) {
      newWorkspaceName = "";
      isCreateSpace.value = false;
    }
    if (errorStatus.value === 400) return;
  }
};
</script>

<template>
  <div class="w-full h-full bg-transparent absolute z-20">
    <div class="w-[400px] h-screen border-r absolute bg-white z-10">
      <SideMenuHeader />
      <div class="px-4 py-6">
        <OpenSpaceButton
          :handleSpaceOpen="handleSpaceOpen"
          :isSpaceOpen="isSpaceOpen"
        />
        <SpaceCreationButton
          :isSpaceOpen="isSpaceOpen"
          :handleOpenSpaceCreation="handleOpenSpaceCreation"
        />
        <NewWorkspaceForm
          :errorMessage="errorMessage"
          :errorStatus="errorStatus"
          :isCreateSpace="isCreateSpace"
          :handleCreateNewSpace="handleCreateNewSpace"
        />
        <WorkspaceList v-if="isSpaceOpen" />
      </div>

      <AssigneeProjectList />
    </div>
  </div>
</template>
