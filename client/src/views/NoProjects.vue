<script setup lang="ts">
import { useDiffStore } from "@/store/modules/difference";
import { useAuthStore } from "@/store/modules/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import {
  parseUsernameFromEmail,
  getWorkspaceIdFromCurrentPath,
} from "@/helpers/helpers";

const differenceStore = useDiffStore();
const authStore = useAuthStore();
const router = useRouter();
const { existingUser } = storeToRefs(authStore);
const { email } = existingUser.value;
const { isSideMenuOpen } = storeToRefs(differenceStore);
</script>

<template>
  <Layout>
    <div
      class="hero h-full bg-white"
      :class="{
        'bg-base-200 blur-sm': isSideMenuOpen,
      }"
    >
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="flex justify-center pb-6">
            <IconNoProject />
          </div>

          <h1 class="text-5xl font-bold">Create project</h1>
          <p class="py-6">
            Create your first project. Create tasks and subtasks. Mark who will
            perform the task and when. View tasks in table or timeline mode
          </p>
          <RouterLink
            :to="`/${parseUsernameFromEmail(
              email
            )}/workspace/${getWorkspaceIdFromCurrentPath(
              router
            )}/create_project`"
          >
            <button class="btn btn-primary">
              <IconPlus class="stroke-primary-content" />
              <span>Create project</span>
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </Layout>
</template>
