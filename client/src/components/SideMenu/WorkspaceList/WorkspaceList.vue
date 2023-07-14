<script setup lang="ts">
import { useWorkspaceStore } from "@/store/modules/workspace";
import { useProjectStore } from "@/store/modules/project";
import { storeToRefs } from "pinia";
import { ref } from "vue";


const workspaceStore = useWorkspaceStore();
const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
const { workspaces } = storeToRefs(workspaceStore);
const { getProjects } = projectStore;
const selectWorkspaceId = ref<number>(0);


const handleOpenProject = async (workspaceId: number) => {
  selectWorkspaceId.value = workspaceId;
  await getProjects(workspaceId);
};
</script>

<template>
  <div class="pt-4">
    <div
      v-for="{ name, id } in workspaces"
      :key="id"
      class="flex items-center justify-between pt-2"
    >
      <div class="flex items-center">
        <button
          class="flex items-center"
          :class="{ 'rotate-180': selectWorkspaceId === id }"
          @click="handleOpenProject(id)"
        >
          <IconChevron />
        </button>
        <span class="pl-2">{{ name }}</span>
      </div>
      <div class="flex items-center pr-3">
        <button class="flex items-center">
          <IconPlus class="stroke-neutral" />
        </button>
      </div>
    </div>
  </div>
</template>
