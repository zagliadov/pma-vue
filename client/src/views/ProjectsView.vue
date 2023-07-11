<script setup lang="ts">
import NoProjects from "./NoProjects.vue";
import { useAuthStore } from "../store/modules/auth";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { existingUser } = storeToRefs(auth);
const { email, workspace } = existingUser?.value;
</script>

<template v-if="workspace[0].projects.length === 0">
    <Layout>
      <NoProjects />
    </Layout>

    

</template>
