<script setup lang="ts">
import { useAuthStore } from "@/store/modules/auth";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { capitalizeFirstLetter } from "@/helpers/helpers";

const authStore = useAuthStore();
const userStore = useUserStore();
const { uploadPhoto } = userStore;
const { existingUser } = storeToRefs(authStore);
const { name } = existingUser.value;
const colorAvatar = ref<string>(localStorage.getItem("color") || "#6e5ee6");
const colorId = ref<number>(Number(localStorage.getItem("color_id")) || 0);
const inputFile = ref(null);

const handleChooseColor = (color: string, id: number) => {
  localStorage.setItem("color", color);
  localStorage.setItem("color_id", String(id));
  colorAvatar.value = color;
  colorId.value = id;
};

const handleUploadPhoto = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadPhoto(e.target.files[0]);
    }
    inputFile.value = null;
  };
</script>

<template>
  <MySettingsLayout>
    <div class="pl-4">
      <div class="flex flex-col">
        <span class="font-medium text-2xl">My Settings</span>
        <span class="font-medium text-base pt-6">Profile photo</span>
      </div>
      <div class="flex pt-5">
        <label
          :style="{ backgroundColor: colorAvatar }"
          htmlFor="upload-photo"
          class="flex cursor-pointer items-center justify-center rounded-full bg-gray-400 w-14 h-14"
        >
          <span class="text-white font-medium text-2xl">{{
            capitalizeFirstLetter(name)
          }}</span>
          <input
            type="file"
            ref="inputFile"
            @change="handleUploadPhoto"
            id="upload-photo"
            accept="/image/*, .jpeg, .png, .jpg"
            class="hidden"
          />
        </label>
        <div class="flex justify-around flex-col pl-6 h-14">
          <span class="font-medium text-base text-gray-600">Upload photo</span>
          <span class="font-normal text-sm text-gray-600"
            >Photo help your teammates recognize you</span
          >
        </div>
      </div>
      <div class="flex flex-col pt-10 pl-10">
        <span class="font-medium text-sm">Color your avatar</span>
        <div class="flex justify-around pt-2 w-[250px]">
          <button
            :class="{ border: colorId === 0 }"
            class="flex items-center justify-center w-12 h-12 rounded-full"
            @click="handleChooseColor('#6e5ee6', 0)"
          >
            <div
              :style="{ backgroundColor: '#6e5ee6' }"
              class="w-6 h-6 rounded-full"
            ></div>
          </button>
          <button
            :class="{ border: colorId === 1 }"
            class="flex items-center justify-center w-12 h-12 rounded-full"
            @click="handleChooseColor('#ff9739', 1)"
          >
            <div
              :style="{ backgroundColor: '#ff9739' }"
              class="w-6 h-6 rounded-full"
            ></div>
          </button>
          <button
            :class="{ border: colorId === 2 }"
            class="flex items-center justify-center w-12 h-12 rounded-full"
            @click="handleChooseColor('#00abfb', 2)"
          >
            <div
              :style="{ backgroundColor: '#00abfb' }"
              class="w-6 h-6 rounded-full"
            ></div>
          </button>
          <button
            :class="{ border: colorId === 3 }"
            class="flex items-center justify-center w-12 h-12 rounded-full"
            @click="handleChooseColor('#ff2b63', 3)"
          >
            <div
              :style="{ backgroundColor: '#ff2b63' }"
              class="w-6 h-6 rounded-full"
            ></div>
          </button>
          <button
            :class="{ border: colorId === 4 }"
            class="flex items-center justify-center w-12 h-12 rounded-full"
            @click="handleChooseColor('#00b050', 4)"
          >
            <div
              :style="{ backgroundColor: '#00b050' }"
              class="w-6 h-6 rounded-full"
            ></div>
          </button>
        </div>
      </div>
    </div>
  </MySettingsLayout>
</template>
