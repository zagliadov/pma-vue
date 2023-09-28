<script setup lang="ts">
import CreateTaskModal from "./CreateTaskModal/CreateTaskModal.vue";
import AssigneesList from "./AssigneesList/AssigneesList.vue";


</script>

<template>
  <div class="p-2 flex">
    <CreateTaskModal />
    <AssigneesList />
  </div>
</template>
