<script setup lang="ts">
import ProfilePhoto from "../components/Settings/ProfilePhoto/ProfilePhoto.vue";
import PersonalInformation from "../components/Settings/PersonalInformation/PersonalInformation.vue";
import LanguageRegionSettings from "../components/Settings/LanguageRegionSettings/LanguageRegionSettings.vue";
import { RouteNameKeys } from "@/types";


</script>

<template>
  <MySettingsLayout>
    <div class="pl-4">
      <div class="flex flex-col">
        <span class="font-medium text-2xl">{{ RouteNameKeys.MySettings }}</span>
      </div>
      <ProfilePhoto />
      <PersonalInformation />
      <LanguageRegionSettings />
    </div>
  </MySettingsLayout>
</template>
