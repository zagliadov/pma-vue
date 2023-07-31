<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAssigneeStore } from "@/store/modules/assignee";
import { useDiffStore } from "@/store/modules/difference";
import { useAuthStore } from "@/store/modules/auth";
import { parseUsernameFromEmail, capitalizeFirstLetter } from "@/helpers/helpers";

const assigneeStore = useAssigneeStore();
const authStore = useAuthStore();
const differenceStore = useDiffStore();
const { setIsSideMenuOpen } = differenceStore;
const { getAssigneeProjects } = useAssigneeStore();
const { assigneeProjects } = storeToRefs(assigneeStore);
const { existingUser } = storeToRefs(authStore);
const { email } = existingUser.value;
const isAssigneeOpen = ref<boolean>(false);

const handleAssigneeOpen = async () => {
  await getAssigneeProjects();
  isAssigneeOpen.value = !isAssigneeOpen.value;
};

const handleCloseSideMenu = () => {
  setIsSideMenuOpen();
};
</script>

<template>
  <div class="px-4 py-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="border-2 border-neutral rounded-full w-5 h-5"></div>
        <span class="pl-1 text-lg">Project assignee</span>
      </div>

      <div class="pr-3">
        <button
          @click="handleAssigneeOpen"
          class="flex items-center"
          :class="{ 'rotate-180': isAssigneeOpen }"
        >
          <IconChevron />
        </button>
      </div>
    </div>
    <div v-if="isAssigneeOpen">
      <div
        v-for="{ id, name, workspaceId } in assigneeProjects"
        :key="id"
        class="pt-4 pl-4"
      >
        <RouterLink
          :to="`/${parseUsernameFromEmail(
            email
          )}/workspace/${workspaceId}/project/${id}`"
          @click="handleCloseSideMenu"
          class="flex items-center text-gray-600 pl-2 hover:text-primary"
        >
          <div
            class="flex items-center justify-center rounded bg-gray-300 w-8 h-8"
          >
            <span>{{ capitalizeFirstLetter(name) }}</span>
          </div>
          <span class="text-base pl-2">{{ name }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
