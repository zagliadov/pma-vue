<script setup lang="ts">
import NotificationsDropdown from "./NotificationsDropdown/NotificationsDropdown.vue";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import {
  capitalizeFirstLetter,
  getEmailFromCurrentPath,
} from "../../helpers/helpers";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const { existingUser } = storeToRefs(authStore);
const { name } = existingUser.value;
const firstLetterInUpperCase = capitalizeFirstLetter(name);
const router = useRouter();
</script>

<template>
  <div class="flex justify-around items-center min-w-[200px] relative">
    <RouterLink
      :to="`/my_settings/${getEmailFromCurrentPath(router)}/information`"
    >
      <IconHelp />
    </RouterLink>
    <NotificationsDropdown />
    <button>
      <IconSettings />
    </button>

    <button class="w-8 h-8 rounded-full bg-gray-300">
      <span>{{ firstLetterInUpperCase }}</span>
    </button>
    <!-- <div class="absolute top-[50px] right-0 border w-[500px] h-[400px]">

    </div> -->
  </div>
</template>
