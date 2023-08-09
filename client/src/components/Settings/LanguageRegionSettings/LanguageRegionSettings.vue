<script setup lang="ts">
import { useUserStore } from "../../../store/modules/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { language, timezone } = storeToRefs(userStore);
</script>

<template>
  <div class="pt-10">
    <div class="border-t pb-10"></div>
    <span class="font-medium text-base"> Language & Region settings </span>
    <div class="flex">
      <div class="form-control w-full max-w-xs pt-4">
        <label class="label">
          <span class="label-text">Language</span>
        </label>
        <select class="select select-bordered" v-model="language">
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </div>

      <div class="form-control w-full max-w-xs pt-4 pl-6">
        <label class="label">
          <span class="label-text">Timezone</span>
        </label>
        <select class="select select-bordered" v-model="timezone">
          <option>CET</option>
          <option>EET</option>
          <option>GMT</option>
          <option>IST</option>
          <option>CST</option>
          <option>JST</option>
          <option>AEST</option>
        </select>
      </div>
    </div>
  </div>
</template>
