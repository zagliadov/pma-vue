<script setup lang="ts">
import { getEmailFromCurrentPath } from "@/helpers/helpers";
import { useRouter } from "vue-router";
import { RouteTypeKeys, RouteNameKeys } from "@/types";

const { hoveredProjectId, id, handleCloseSideMenu, selectWorkspaceId } =
  defineProps<{
    hoveredProjectId: number | null;
    id: number;
    handleCloseSideMenu: Function;
    selectWorkspaceId: number;
  }>();
const router = useRouter();
</script>

<template>
  <div v-if="hoveredProjectId === id" class="dropdown dropdown-right cursor-pointer w-full flex justify-center">
    <button tabIndex="{0}" className="ml-[10px]">
      <IconMoreVerticalSettings />
    </button>
    <div tabindex="{0}" class="dropdown-content z-[1] menu p-10 ml-[-15px]">
      <div class="w-[180px] shadow bg-base-100 rounded">
        <div>
          <RouterLink
            :to="`/${RouteTypeKeys.MY_SETTINGS}/${getEmailFromCurrentPath(router)}`"
            @click="handleCloseSideMenu"
            class="flex items-center justify-between p-3 hover:bg-neutral-content"
          >
            <div class="flex items-center">
              <IconMySettingsProject />
              <span class="pl-3">{{ RouteNameKeys.MySettings }}</span>
            </div>
          </RouterLink>
          <RouterLink
            :to="`/${RouteTypeKeys.MY_SETTINGS}/${getEmailFromCurrentPath(
              router
            )}/${RouteTypeKeys.PROJECTS}`"
            @click="handleCloseSideMenu"
            class="flex items-center justify-between p-3 hover:bg-neutral-content"
          >
            <div class="flex items-center">
              <IconUsers />
              <span class="pl-3">{{ RouteNameKeys.Members }}</span>
            </div>
          </RouterLink>
          <RouterLink
            :to="`/${getEmailFromCurrentPath(router)}/${
              RouteTypeKeys.WORKSPACE
            }/${selectWorkspaceId}/${RouteTypeKeys.PROJECT}/${id}`"
            @click="handleCloseSideMenu"
            class="flex items-center justify-between p-3 hover:bg-neutral-content"
          >
            <div class="flex items-center">
              <IconTable />
              <span class="pl-3">{{ RouteNameKeys.MainTable }}</span>
            </div>
          </RouterLink>
          <RouterLink
            :to="`/${getEmailFromCurrentPath(router)}/${
              RouteTypeKeys.WORKSPACE
            }/${selectWorkspaceId}/${RouteTypeKeys.PROJECT}/${id}/${
              RouteTypeKeys.TIMELINE
            }`"
            @click="handleCloseSideMenu"
            class="flex items-center justify-between p-3 hover:bg-neutral-content"
          >
            <div class="flex items-center">
              <IconTimelineTable />
              <span class="pl-3">{{ RouteNameKeys.Timeline }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
