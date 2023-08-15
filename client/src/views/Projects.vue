<script setup lang="ts">
import { useProjectStore } from '@/store/modules/project';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();
const { totalProjectsCount } = storeToRefs(projectStore);
</script>


<template>
  <MySettingsLayout>
    <div>
      <div class="flex flex-col">
        <span class="font-medium text-2xl">Projects</span>
        <span class="pt-6 font-medium text-lg">Your projects ({{totalProjectsCount}})</span>
      </div>
    </div>
  </MySettingsLayout>
</template>
