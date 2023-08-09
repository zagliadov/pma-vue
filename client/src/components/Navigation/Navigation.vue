<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDiffStore } from "@/store/modules/difference";
import TableNavigation from "./TableNavigation.vue";
import TableSearch from "./TableSearch.vue";
import UserMenu from "./UserMenu.vue";

const diffStore = useDiffStore();
const { setIsSideMenuOpen } = diffStore;
const { isSideMenuOpen } = storeToRefs(diffStore);

const handleSideMenuOpen = async () => {
  setIsSideMenuOpen();
};
</script>

<template>
  <div class="flex flex-col">
    <SideMenu v-if="isSideMenuOpen" />
    <div class="flex px-4 py-2 border-b h-[56px]">
      <div class="flex items-center">
        <button class="flex items-center" @click="handleSideMenuOpen">
          <IconSideMenu />
        </button>
      </div>
      <div class="flex justify-between w-full">
        <TableNavigation />
        <div class="flex items-center justify-end w-full">
          <TableSearch />
          <UserMenu />
        </div>
      </div>
    </div>
  </div>
</template>
