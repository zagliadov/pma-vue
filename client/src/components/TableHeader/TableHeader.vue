<script setup lang="ts">
import CreateTaskModal from "./CreateTaskModal/CreateTaskModal.vue";
import AssigneesList from "./AssigneesList/AssigneesList.vue";
import ShowMeAssigneesButton from "./ShowMeAssigneesButton/ShowMeAssigneesButton.vue";


</script>

<template>
  <div class="p-2 flex">
    <CreateTaskModal />
    <AssigneesList />
    <ShowMeAssigneesButton />
  </div>
</template>
