<script setup lang="ts">
import IconApple from "../icons/IconApple.vue";
</script>

<template>
  <button
    className="btn btn-outline-neutral-content flex justify-center items-center py-2.5 border border-neutral-content rounded"
  >
    <IconApple />
    <span className="font-medium text-base text-gray-600 pl-2">
      <slot />
    </span>
  </button>
</template>
