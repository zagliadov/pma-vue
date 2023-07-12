<script setup lang="ts">
import NoProjects from "./NoProjects.vue";
import { useAuthStore } from "../store/modules/auth";
import { useDiffStore } from "../store/modules/difference";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const diff = useDiffStore()
const { existingUser } = storeToRefs(auth);
const { isSideMenuOpen } = storeToRefs(diff);
const { email, workspace } = existingUser?.value;
</script>

<template v-if="workspace[0].projects.length === 0">
    <Layout>
      <!-- <SideMenu v-if="isSideMenuOpen"/> -->
      <NoProjects />
    </Layout>

    

</template>
