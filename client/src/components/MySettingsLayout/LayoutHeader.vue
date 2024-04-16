<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { useAuthStore } from "@/store/modules/auth";
import { RouteTypeKeys } from "@/types";

import * as _ from "lodash";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import {
  isMySettingsRoute,
  getEmailFromCurrentPath,
  getRouteParams,
} from "../../helpers/helpers";
const userStore = useUserStore();
const authStore = useAuthStore();
const {
  firstName,
  lastName,
  userName,
  phoneNumber,
  language,
  timezone,
  startOfTheCalendarWeek,
  timeFormat,
  dateFormat,
} = storeToRefs(userStore);
const { existingUser } = storeToRefs(authStore);

const router = useRouter();
const { updatePersonalInformation } = userStore;
const handleSaveChanges = async () => {
  await updatePersonalInformation({
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    phoneNumber: phoneNumber.value,
    language: language.value,
    timezone: timezone.value,
    startOfTheCalendarWeek: startOfTheCalendarWeek.value,
    timeFormat: timeFormat.value,
    dateFormat: dateFormat.value,
  });
};
const handleNavigateBack = () => {
  const email = getEmailFromCurrentPath(router);
  const workspaceId = _.get(existingUser, "value.workspace[0].id");
  router.push(`/${email}/${RouteTypeKeys.WORKSPACES}/${workspaceId}`);
};
</script>

<template>
  <button class="flex items-center" @click="handleNavigateBack">
    <IconLeftArrow />
    <span class="pl-2">Back to table</span>
  </button>
  <div class="h-[30px]">
    <button
      v-if="isMySettingsRoute(router)"
      @click="handleSaveChanges"
      class="btn btn-primary"
    >
      Save changes
    </button>
  </div>
</template>
