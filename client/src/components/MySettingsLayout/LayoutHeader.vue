<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
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
  firstName.value = "";
  lastName.value = "";
  userName.value = "";
  phoneNumber.value = "";
  language.value = "";
  startOfTheCalendarWeek.value = "";
  timeFormat.value = "";
  dateFormat.value = "";
  timezone.value = "";
};
</script>

<template>
  <button class="flex items-center">
    <IconLeftArrow />
    <span class="pl-2">Back to table</span>
  </button>
  <div>
    <button @click="handleSaveChanges" class="btn btn-primary">
      Save changes
    </button>
  </div>
</template>
