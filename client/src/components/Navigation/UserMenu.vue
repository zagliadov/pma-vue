<script setup lang="ts">
import NotificationsDropdown from "./NotificationsDropdown/NotificationsDropdown.vue";
import UserPersonalMenu from "./UserPersonalMenu/UserPersonalMenu.vue";
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
    <UserPersonalMenu />
    <!-- <button class="w-8 h-8 rounded-full bg-gray-300">
      <span>{{ firstLetterInUpperCase }}</span>
    </button> -->
  </div>
</template>
