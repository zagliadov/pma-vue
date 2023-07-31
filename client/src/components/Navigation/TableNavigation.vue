<script setup lang="ts">
import IconTimeline from "@/components/icons/IconTimeline.vue";
import { useRouter } from "vue-router";
import { useProjectStore } from "@/store/modules/project";
import { storeToRefs } from "pinia";
import {
  isCreateProjectRoute,
  createMainTableRoute,
  createTimelineTableRoute,
} from "@/helpers/helpers";

const projectStore = useProjectStore();
const { project } = storeToRefs(projectStore);
const router = useRouter();
</script>

<template>
  <div class="flex items-center" v-if="!isCreateProjectRoute(router)">
    <span class="font-medium text-lg pr-4 truncate max-w-[150px]">{{ project?.name }}</span>
    <div class="border-r border-base-300 h-4 w-1"></div>
    <RouterLink
      :to="createMainTableRoute(router)"
      class="flex items-center px-4 min-w-[130px]"
      :class="{ 'text-primary': $route.path === createMainTableRoute(router) }"
      exact
    >
      <IconMainTableColumns
        :class="{
          'stroke-primary': $route.path === createMainTableRoute(router),
        }"
      />
      <span class="pl-1">Main Table</span>
    </RouterLink>
    <div class="border-r border-base-300 h-4 w-1"></div>
    <RouterLink
      :to="createTimelineTableRoute(router)"
      class="flex items-center pl-4 min-w-[130px]"
      :class="{
        'text-primary': $route.path === createTimelineTableRoute(router),
      }"
      exact
    >
      <IconTimeline
        :class="{
          'stroke-primary': $route.path === createTimelineTableRoute(router),
        }"
      />
      <span class="pl-1">Timeline</span>
    </RouterLink>
  </div>
</template>
