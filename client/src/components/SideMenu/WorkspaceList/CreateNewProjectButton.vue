<script setup lang="ts">
import { parseUsernameFromEmail } from '@/helpers/helpers';

const { email, id, handleCloseSideMenu } = defineProps<{
  email: string
  id: number
  handleCloseSideMenu: Function
}>();

</script>

<template>
  <div class="flex items-center pr-3">
    <RouterLink
      :to="`/${parseUsernameFromEmail(email)}/workspace/${id}/create_project`"
      @click="handleCloseSideMenu"
      class="text-gray-600 font-medium text-sm pl-2 hover:text-primary"
    >
      <IconPlus class="stroke-neutral" />
    </RouterLink>
  </div>
</template>
