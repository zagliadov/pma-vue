<script setup lang="ts">
import { useAuthStore } from "../store/modules/auth";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { existingUser } = storeToRefs(auth);

const { email, workspace } = existingUser?.value;
console.log(email, workspace[0]);
</script>

<template>HELLO</template>
