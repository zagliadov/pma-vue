<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { storeToRefs  } from "pinia";

const userStore = useUserStore();
const { firstName, lastName, userName, phoneNumber } = storeToRefs(userStore);

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
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  </div>
</template>
