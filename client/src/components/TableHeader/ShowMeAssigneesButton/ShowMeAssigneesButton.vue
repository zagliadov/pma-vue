<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import MembersCount from "./MembersCount.vue";
import AddMembersButton from "./AddMembersButton.vue";
import AssigneeList from "./AssigneeList.vue";

const userStore = useUserStore();
</script>

<template>
  <details class="dropdown pl-10 pr-2">
    <summary class="btn bg-transparent border-none">
      <IconEye /><span>Show me</span>
    </summary>
    <div class="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-60 p-0">
      <MembersCount />
      <div>
        <AssigneeList />
      </div>
      <AddMembersButton v-if="userStore.isProjectCreator" />
    </div>
  </details>
</template>
