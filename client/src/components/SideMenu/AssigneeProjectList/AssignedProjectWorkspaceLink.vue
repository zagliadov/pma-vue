<script setup lang="ts">
import {
  parseUsernameFromEmail,
  capitalizeFirstLetter,
} from "@/helpers/helpers";

const { email, workspaceId, id, handleCloseSideMenu, name } = defineProps<{
  email: string;
  workspaceId: number;
  id: number;
  handleCloseSideMenu: Function;
  name: string;
}>();
</script>

<template>
  <RouterLink
    :to="`/${parseUsernameFromEmail(
      email
    )}/workspace/${workspaceId}/project/${id}`"
    @click="handleCloseSideMenu()"
    class="flex items-center text-gray-600 pl-2 hover:text-primary"
  >
    <div>
      <span
        class="w-8 h-8 flex items-center justify-center rounded bg-gray-300"
        >{{ capitalizeFirstLetter(name) }}</span
      >
    </div>
    <span class="text-base pl-2 pr-4 w-[260px]">{{ name }}</span>
  </RouterLink>
</template>
