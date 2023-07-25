<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAssigneeStore } from "@/store/modules/assignee";
import { useAuthStore } from "@/store/modules/auth";
import { parseUsernameFromEmail } from "@/helpers/helpers";

const assigneeStore = useAssigneeStore();
const authStore = useAuthStore();
const { getAssigneeProjects } = useAssigneeStore();
const { assigneeProjects } = storeToRefs(assigneeStore);
const { existingUser } = storeToRefs(authStore);
const { email } = existingUser.value;
const isAssigneeOpen = ref<boolean>(false);

const handleAssigneeOpen = async () => {
  await getAssigneeProjects();
  isAssigneeOpen.value = !isAssigneeOpen.value;
  
};
</script>

<template>
  <div class="px-4 py-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="border-2 border-neutral rounded-full w-5 h-5"></div>
        <span class="pl-1">Project assignee</span>
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
      <div v-for="{ id, name, workspaceId } in assigneeProjects" :key="id" class="pt-4">
        <RouterLink
          :to="`/${parseUsernameFromEmail(
            email
          )}/workspace/${workspaceId}/project/${id}`"
          @click="handleCloseSideMenu"
          class="text-gray-600 font-medium text-sm pl-2 hover:text-primary"
        >
          <span>{{ name }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
