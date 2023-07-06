<script setup lang="ts">

</script>



<template>
  <button
    className="btn btn-outline-neutral-content flex justify-center items-center py-2.5 border border-neutral-content rounded"
  >
    <IconGoogle />
    <span className="font-medium text-base text-gray-600 pl-2">
      <slot />
    </span>
  </button>
</template>
