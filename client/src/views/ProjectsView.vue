<script setup lang="ts">
import NoProjects from "./NoProjects.vue";
import { useAuthStore } from "../store/modules/auth";
import { useProjectStore } from "@/store/modules/project";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const projectStore = useProjectStore();
const { existingUser } = storeToRefs(auth);
const { email, workspace } = existingUser?.value;
</script>

<template>
    <Layout v-if="workspace[0].projects.length === 0">
      <NoProjects />
    </Layout>
    <Layout v-if="workspace[0].projects.length !== 0">
      HELLO
    </Layout>
</template>
