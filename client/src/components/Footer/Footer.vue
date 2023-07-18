<script setup lang="ts">
import { useDiffStore } from "../../store/modules/difference";
import { storeToRefs } from "pinia";

const differenceStore = useDiffStore();
const { isSideMenuOpen } = storeToRefs(differenceStore);
</script>

<template>
  <div class="flex justify-center" :class="{'bg-base-200 blur-sm disabled': isSideMenuOpen}">
    <h2>© 2023 Saas PMA MVP</h2>
  </div>
</template>
