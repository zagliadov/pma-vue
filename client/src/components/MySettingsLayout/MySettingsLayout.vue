<script setup lang="ts">
import LayoutHeader from "./LayoutHeader.vue";
import { useRouter } from "vue-router";
import {
  getEmailFromCurrentPath,
  isMySettingsRoute,
  isNotificationRoute,
  isProjectsRoute,
  isInformationRoute,
} from "@/helpers/helpers";

const router = useRouter();
</script>

<template>
  <header class="flex items-center justify-between p-4">
    <LayoutHeader />
  </header>
  <main class="flex p-4 h-auto">
    <div class="flex flex-col w-[300px] min-w-[200px] pr-4">
      <RouterLink
        class="flex items-center p-3 rounded"
        :to="`/my_settings/${getEmailFromCurrentPath(router)}`"
        :class="{ 'bg-gray-200': isMySettingsRoute(router) }"
        exact
      >
        <IconMySettingsUser />
        <span class="pl-2">My settings</span>
      </RouterLink>
      <RouterLink
        class="flex items-center p-3 rounded"
        :to="`/my_settings/${getEmailFromCurrentPath(router)}/notification`"
        :class="{ 'bg-gray-200': isNotificationRoute(router) }"
        exact
      >
        <IconMySettingsBell />
        <span class="pl-2">Notification</span>
      </RouterLink>
      <RouterLink
        class="flex items-center p-3 rounded"
        :to="`/my_settings/${getEmailFromCurrentPath(router)}/projects`"
        :class="{ 'bg-gray-200': isProjectsRoute(router) }"
        exact
      >
        <IconMySettingsProject />
        <span class="pl-2">Projects</span>
      </RouterLink>
      <RouterLink
        class="flex items-center p-3 rounded"
        :to="`/my_settings/${getEmailFromCurrentPath(router)}/information`"
        :class="{ 'bg-gray-200': isInformationRoute(router) }"
        exact
      >
        <IconMySettingsHelp />
        <span class="pl-2">Information</span>
      </RouterLink>
      <div class="h-[1px] bg-gray-200"></div>
      <RouterLink class="flex items-center p-3 rounded" :to="`/login`">
        <IconMySettingsLogOut />
        <span class="pl-2 text-error">Log out</span>
      </RouterLink>
    </div>
    <div class="w-full">
      <slot />
    </div>
  </main>
</template>
