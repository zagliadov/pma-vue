<script setup lang="ts">
import { getEmailFromCurrentPath } from "@/helpers/helpers";
import { useRouter } from "vue-router";
import { RouteTypeKeys } from "@/types";

const { hoveredAssigneeProjectId, id, handleCloseSideMenu, workspaceId } =
  defineProps<{
    hoveredAssigneeProjectId: number | null;
    id: number;
    handleCloseSideMenu: Function;
    workspaceId: number;
  }>();
const router = useRouter();
</script>

<template>
  <div v-if="hoveredAssigneeProjectId === id" class="dropdown dropdown-right cursor-pointer w-full flex justify-center">
    <button tabIndex="{0}" className="ml-[10px]">
      <IconMoreVerticalSettings />
    </button>
    <div tabindex="{0}" class="dropdown-content z-[1] menu p-10 ml-[-15px]">
      <div class="w-[180px] shadow bg-base-100 rounded">
        <div>
          <RouterLink
            :to="`/${RouteTypeKeys.MY_SETTINGS}/${getEmailFromCurrentPath(router)}/projects`"
            @click="handleCloseSideMenu"
            class="flex items-center justify-between p-3 hover:bg-neutral-content"
          >
            <div class="flex items-center">
              <IconMySettingsProject />
              <span class="pl-3">Settings</span>
            </div>
          </RouterLink>
          <RouterLink
            :to="`/my_settings/${getEmailFromCurrentPath(router)}/projects`"
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
</template>
