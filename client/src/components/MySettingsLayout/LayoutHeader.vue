<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { firstName, lastName, userName, phoneNumber, language, timezone } = storeToRefs(userStore);
const { updatePersonalInformation } = userStore;

const phoneNumberRegex = /^\+\d-\d{3}-\d{3}-\d{4}$/;

// const isValidPhoneNumber = phoneNumberRegex.test(phoneNumber.value);

const handleSaveChanges = async () => {
  await updatePersonalInformation({
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    phoneNumber: phoneNumber.value,
    language: language.value,
    timezone: timezone.value,
  });
  firstName.value = "";
  lastName.value = "";
  userName.value = "";
  phoneNumber.value = 0;
  language.value = "";
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
