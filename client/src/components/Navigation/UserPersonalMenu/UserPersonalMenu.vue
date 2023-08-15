<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../../store/modules/auth";
import { storeToRefs } from "pinia";
import {
  capitalizeFirstLetter,
  getEmailFromCurrentPath,
  isInformationRoute,
  isProjectsRoute,
  isNotificationRoute,
  isMySettingsRoute
} from "../../../helpers/helpers";

const authStore = useAuthStore();
const { existingUser } = storeToRefs(authStore);
const { name, firstName, lastName, email } = existingUser.value;
const router = useRouter();
const firstLetterInUpperCase = capitalizeFirstLetter(name);
</script>

<template>
  <div className="dropdown dropdown-end">
    <button class="w-8 h-8 rounded-full bg-gray-300">
      <span>{{ firstLetterInUpperCase }}</span>
    </button>
    <div tabIndex="{0}" className="dropdown-content z-[1] menu p-4 w-[300px]">
      <div class="bg-base-100 shadow">
        <!-- header Brooklyn Simmons -->
        <div class="flex items-center p-4 border-b">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300"
          >
            <span>{{ firstLetterInUpperCase }}</span>
          </div>
          <div class="flex flex-col pl-3">
            <span>{{ firstName || "Brooklyn" }} {{ lastName || "Simmons" }}</span>
            <span class="text-gray-400 text-sm">{{ email || "email@example.com" }}</span>
          </div>
        </div>
        <div class="p-4 border-b">
          <RouterLink
            class="flex items-center pt-4"
            :to="`/my_settings/${getEmailFromCurrentPath(router)}`"
            :class="{ 'bg-gray-200': isMySettingsRoute(router) }"
            exact
          >
            <IconProfilePersonal />
            <span class="pl-2">Profile</span>
          </RouterLink>
          <RouterLink
            class="flex items-center pt-4"
            :to="`/my_settings/${getEmailFromCurrentPath(router)}/notification`"
            :class="{ 'bg-gray-200': isNotificationRoute(router) }"
            exact
          >
            <IconNotificationPersonal />
            <span class="pl-2">Notification</span>
          </RouterLink>
          <RouterLink
            class="flex items-center pt-4"
            :to="`/my_settings/${getEmailFromCurrentPath(router)}/projects`"
            :class="{ 'bg-gray-200': isProjectsRoute(router) }"
            exact
          >
            <IconSettingPersonal />
            <span class="pl-2">Settings</span>
          </RouterLink>
          <RouterLink
            class="flex items-center pt-4"
            :to="`/my_settings/${getEmailFromCurrentPath(router)}/information`"
            :class="{ 'bg-gray-200': isInformationRoute(router) }"
            exact
          >
            <IconInformationPersonal />
            <span class="pl-2">information</span>
          </RouterLink>
        </div>
        <div>
          <RouterLink class="flex items-center p-3 rounded" :to="`/login`">
            <IconMySettingsLogOut />
            <span class="pl-2 text-error">Log out</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
