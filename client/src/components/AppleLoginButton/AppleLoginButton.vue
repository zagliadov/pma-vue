<script setup lang="ts">
import AppleLoginButton from "../icons/IconApple.vue";
</script>

<template>
  <button
    className="btn btn-outline-neutral-content flex justify-center items-center py-2.5 border border-neutral-content rounded"
  >
    <AppleLoginButton />
    <span className="font-medium text-base text-gray-600 pl-2">
      Log in with Apple
    </span>
  </button>
</template>
