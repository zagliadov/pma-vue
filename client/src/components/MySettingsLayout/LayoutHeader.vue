<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { isMySettingsRoute } from "../../helpers/helpers";
const userStore = useUserStore();
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
</script>

<template>
  <button class="flex items-center">
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
