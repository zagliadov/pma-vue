<script setup lang="ts">
import { useUserStore } from "../../../store/modules/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { language, timezone, startOfTheCalendarWeek, timeFormat, dateFormat } = storeToRefs(userStore);
</script>

<template>
  <div class="pt-10 pb-10">
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
    <div class="pt-10">
      <span class="text-sm font-medium"> Start of the calendar week </span>
      <div class="flex items-center justify-start w-[400px] pt-4">
        <div class="flex items-center">
          <input type="radio" name="radio-7" value="Sunday" class="radio radio-accent" v-model="startOfTheCalendarWeek" />
          <label for="radio-7" class="pl-4">Sunday</label>
        </div>
        <div class="flex items-center pl-[80px]">
          <input type="radio" name="radio-7" value="Monday" class="radio radio-accent" v-model="startOfTheCalendarWeek" />
          <label for="radio-7" class="pl-4">Monday</label>
        </div>
      </div>
    </div>
    <div class="pt-10">
      <span class="text-sm font-medium">Time format</span>
      <div class="flex items-center justify-start w-[400px] pt-4">
        <div class="flex items-center">
          <input type="radio" name="radio-8" value="24 hour" class="radio radio-accent" v-model="timeFormat" />
          <label for="radio-7" class="pl-4">24 hour</label>
        </div>
        <div class="flex items-center pl-[80px]">
          <input type="radio" name="radio-8" value="12 hour" class="radio radio-accent"  v-model="timeFormat" />
          <label for="radio-7" class="pl-4">12 hour</label>
        </div>
      </div>
    </div>
    <div class="pt-10">
      <span class="text-sm font-medium">Date format</span>
      <div class="flex items-center justify-start w-[400px] pt-4">
        <div class="flex items-center">
          <input type="radio" name="radio-9" class="radio radio-accent" value="mm/dd/yyyy" v-model="dateFormat" />
          <label for="radio-7" class="pl-4">mm/dd/yyyy</label>
        </div>
        <div class="flex items-center pl-[56px]">
          <input type="radio" name="radio-9" value="dd/mm/yyyy" class="radio radio-accent" v-model="dateFormat" />
          <label for="radio-7" class="pl-4">dd/mm/yyyy</label>
        </div>
      </div>
    </div>
    <div class="pt-10 flex flex-col">
      <span class="font-medium text-base">Manage account</span>
      <span class="text-gray-600 text-sm py-4">Deleting an account is an irreversible action. After deleting the account, all data will be lost</span>
      <button className="btn btn-error w-52">Delete account</button>
    </div>
  </div>
</template>
