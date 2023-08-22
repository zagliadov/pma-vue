<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAssigneeStore } from "@/store/modules/assignee";
import { useDiffStore } from "@/store/modules/difference";
import { useAuthStore } from "@/store/modules/auth";
import { useRouter } from "vue-router";
import {
  parseUsernameFromEmail,
  capitalizeFirstLetter,
  getEmailFromCurrentPath,
} from "@/helpers/helpers";

const assigneeStore = useAssigneeStore();
const authStore = useAuthStore();
const differenceStore = useDiffStore();
const { setIsSideMenuOpen } = differenceStore;
const { getAssigneeProjects } = useAssigneeStore();
const { assigneeProjects } = storeToRefs(assigneeStore);
const { existingUser } = storeToRefs(authStore);
const { email } = existingUser.value;
const isAssigneeOpen = ref<boolean>(false);
const hoveredAssigneeProjectId = ref<number | null>(null);
const router = useRouter();

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
    <div
      class="flex justify-between items-center cursor-pointer"
      @click="handleAssigneeOpen"
    >
      <div class="flex items-center">
        <div class="border-2 border-neutral rounded-full w-5 h-5"></div>
        <span class="pl-1 text-lg">Project assignee</span>
      </div>

      <div class="pr-3">
        <button
          class="flex items-center"
          :class="{ 'rotate-180': isAssigneeOpen }"
        >
          <IconChevron />
        </button>
      </div>
    </div>

    <div v-if="isAssigneeOpen" class="pt-1 pl-4">
      <div
        v-for="{ id, name, workspaceId } in assigneeProjects"
        :key="id"
        class="pt-2"
      >
        <div
          class="flex items-center justify-between"
          @mouseenter="hoveredAssigneeProjectId = id"
          @mouseleave="hoveredAssigneeProjectId = null"
        >
          <RouterLink
            :to="`/${parseUsernameFromEmail(
              email
            )}/workspace/${workspaceId}/project/${id}`"
            @click="handleCloseSideMenu"
            class="flex items-center text-gray-600 pl-2 hover:text-primary"
          >
            <div>
              <span
                class="w-8 h-8 flex items-center justify-center rounded bg-gray-300"
                >{{ capitalizeFirstLetter(name) }}</span
              >
            </div>
            <span class="text-base pl-2 pr-4 w-[260px]">{{ name }}</span>
          </RouterLink>

          <div
            v-if="hoveredAssigneeProjectId === id"
            class="dropdown dropdown-right"
          >
            <button tabIndex="{0}">
              <IconMoreVerticalSettings />
            </button>
            <div tabindex="{0}" class="dropdown-content z-[1] menu p-5">
              <div class="w-[180px] shadow bg-base-100 rounded">
                <div>
                  <RouterLink
                    :to="`/my_settings/${getEmailFromCurrentPath(
                      router
                    )}/projects`"
                    @click="handleCloseSideMenu"
                    class="flex items-center justify-between p-3 hover:bg-neutral-content"
                  >
                    <div class="flex items-center">
                      <IconMySettingsProject />
                      <span class="pl-3">Settings</span>
                    </div>
                  </RouterLink>
                  <RouterLink
                    :to="`/my_settings/${getEmailFromCurrentPath(
                      router
                    )}/projects`"
                    @click="handleCloseSideMenu"
                    class="flex items-center justify-between p-3 hover:bg-neutral-content"
                  >
                    <div class="flex items-center">
                      <IconUsers />
                      <span class="pl-3">Members</span>
                    </div>
                  </RouterLink>
                  <RouterLink
                    :to="`/${getEmailFromCurrentPath(
                      router
                    )}/workspace/${workspaceId}/project/${id}`"
                    @click="handleCloseSideMenu"
                    class="flex items-center justify-between p-3 hover:bg-neutral-content"
                  >
                    <div class="flex items-center">
                      <IconTable />
                      <span class="pl-3">Main Table</span>
                    </div>
                  </RouterLink>
                  <RouterLink
                    :to="`/${getEmailFromCurrentPath(
                      router
                    )}/workspace/${workspaceId}/project/${id}/timeline`"
                    @click="handleCloseSideMenu"
                    class="flex items-center justify-between p-3 hover:bg-neutral-content"
                  >
                    <div class="flex items-center">
                      <IconTimelineTable />
                      <span class="pl-3">Timeline</span>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
