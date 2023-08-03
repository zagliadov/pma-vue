<script setup lang="ts">
import ProfilePhoto from "../components/ProfilePhoto/ProfilePhoto.vue";
</script>

<template>
  <MySettingsLayout>
    <div class="pl-4">
      <div class="flex flex-col">
        <span class="font-medium text-2xl">My Settings</span>
        <span class="font-medium text-base pt-6">Profile photo</span>
      </div>
      <ProfilePhoto />

    </div>
  </MySettingsLayout>
</template>
