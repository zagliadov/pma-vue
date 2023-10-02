<script setup lang="ts">
import NotificationsDropdown from "./NotificationsDropdown/NotificationsDropdown.vue";
import UserPersonalMenu from "./UserPersonalMenu/UserPersonalMenu.vue";
import { getEmailFromCurrentPath } from "../../helpers/helpers";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="flex justify-around items-center min-w-[200px] relative">
    <RouterLink :to="`/my_settings/${getEmailFromCurrentPath(router)}/information`">
      <IconHelp />
    </RouterLink>
    <NotificationsDropdown />
    <button>
      <IconSettings />
    </button>
    <UserPersonalMenu />
  </div>
</template>
