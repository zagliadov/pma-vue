<script setup lang="ts">
import CreateTaskModal from "./CreateTaskModal/CreateTaskModal.vue";
import AssigneesList from "./AssigneesList/AssigneesList.vue";
import ShowMeAssigneesButton from "./ShowMeAssigneesButton/ShowMeAssigneesButton.vue";
import FilterButton from "./FilterButton/FilterButton.vue";
import ShareButton from "./ShareButton/ShareButton.vue";
</script>

<template>
  <div class="flex items-center justify-between p-2">
    <div class="flex items-center">
      <CreateTaskModal />
      <AssigneesList />
      <ShowMeAssigneesButton />
      <FilterButton />
    </div>
    <div>
      <ShareButton />
    </div>
  </div>
</template>
