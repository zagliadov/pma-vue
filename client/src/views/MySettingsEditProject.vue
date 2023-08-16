<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { getEmailFromCurrentPath } from "@/helpers/helpers";

const router = useRouter();
</script>

<template>
  <MySettingsLayout>
    <div>
      <div class="flex">
        <RouterLink
          :to="`/my_settings/${getEmailFromCurrentPath(router)}/projects`"
          class="flex items-center px-5 py-2 border border-gray-100 rounded hover:bg-gray-50"
        >
          <IconLeftArrow />
          <span class="pl-3 font-medium text-sm text-gray-600">Back to list</span>
        </RouterLink>
      </div>
    </div>
  </MySettingsLayout>
</template>
