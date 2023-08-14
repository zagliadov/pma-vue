<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const userStore = useUserStore();
const authStore = useAuthStore();
const { firstName, lastName, userName, phoneNumber } = storeToRefs(userStore);
const { existingUser } = storeToRefs(authStore);
const isValidPhoneNumber = ref<boolean>(false);
const validatePhoneNumber = () => {
  const phoneRegex = /^\+\d-\d{3}-\d{3}-\d{4}$/;
  isValidPhoneNumber.value = phoneRegex.test(phoneNumber.value);
};
</script>

<template>
  <div class="pt-6">
    <div class="border-t pb-6"></div>
    <span class="font-medium text-base">Personal information</span>
    <div>
      <div class="flex pt-4">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">First Name</span>
          </label>
          <input
            v-model="firstName"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </div>

        <div class="form-control w-full max-w-xs pl-6">
          <label class="label">
            <span class="label-text">Last Name</span>
          </label>
          <input
            v-model="lastName"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>

      <div class="flex pt-4">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">User Name</span>
          </label>
          <input
            v-model="userName"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </div>

        <div class="form-control w-full max-w-xs pl-6">
          <label class="label">
            <span class="label-text">Phone Number</span>
          </label>
          <input
            v-model="phoneNumber"
            @input="validatePhoneNumber"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  </div>
</template>
