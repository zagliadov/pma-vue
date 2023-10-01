<script setup lang="ts">

const { projectId } = defineProps(["projectId"])
const handleAddMembers = () => {
  console.log("add members fn", projectId);
};
</script>

<template>
  <div class="px-4 py-2">
    <button class="btn w-full bg-green-50" @click="handleAddMembers">
      <IconPlus />
      <span class="text-primary">Add members</span>
    </button>
  </div>
</template>
