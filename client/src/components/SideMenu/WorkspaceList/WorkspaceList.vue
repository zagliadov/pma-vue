<script setup lang="ts">
import { useWorkspaceStore } from "@/store/modules/workspace";
import { useDiffStore } from "@/store/modules/difference";
import { useProjectStore } from "@/store/modules/project";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { parseUsernameFromEmail } from "../../../helpers/helpers";
import { ref } from "vue";

const workspaceStore = useWorkspaceStore();
const projectStore = useProjectStore();
const authStore = useAuthStore();
const differenceStore = useDiffStore();
const { projects } = storeToRefs(projectStore);
const { workspaces } = storeToRefs(workspaceStore);
const { existingUser } = storeToRefs(authStore);
const { email } = existingUser.value;
const { getProjects } = projectStore;
const { setIsSideMenuOpen } = differenceStore;
const selectWorkspaceId = ref<number>(0);

const handleOpenProject = async (workspaceId: number) => {
  selectWorkspaceId.value = workspaceId;
  await getProjects(workspaceId);
};

const handleCloseSideMenu = () => {
  setIsSideMenuOpen();
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
        <RouterLink
          :to="`/${parseUsernameFromEmail(
            email
          )}/workspace/${id}/create_project`"
          @click="handleCloseSideMenu"
          class="text-gray-600 font-medium text-sm pl-2 hover:text-primary"
        >
          <IconPlus class="stroke-neutral" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
