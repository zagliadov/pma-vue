<script setup lang="ts">
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { capitalizeFirstLetter, getEmailFromCurrentPath } from "../../helpers/helpers";
import { useRouter } from "vue-router";


const authStore = useAuthStore();
const { existingUser } = storeToRefs(authStore);
const { name } = existingUser.value;
const firstLetterInUpperCase = capitalizeFirstLetter(name);
const router = useRouter();
</script>

<template>
  <div class="flex justify-around items-center min-w-[200px]">
    <RouterLink :to="`/my_settings/${getEmailFromCurrentPath(router)}/information`">
      <IconHelp />
    </RouterLink>
    <button>
      <IconBell />
    </button>
    <button>
      <IconSettings />
    </button>

    <button class="w-8 h-8 rounded-full bg-gray-300">
      <span>{{ firstLetterInUpperCase }}</span>
    </button>
  </div>
</template>
