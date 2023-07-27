<script setup lang="ts">
import { useProjectStore } from "../store/modules/project";
import { useDiffStore } from "@/store/modules/difference";
import {
  validateEmail,
  getWorkspaceIdFromCurrentURL,
} from "../helpers/helpers";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const router = useRouter();
const projectStore = useProjectStore();
const differenceStore = useDiffStore();
const { addNewProject } = projectStore;
const member = ref<string>("");
const projectName = ref<string>("");
const projectMembers = ref<string[]>([]);
const projectDescription = ref<string>("");
const { isSideMenuOpen } = storeToRefs(differenceStore);

const handleCloseModal = () => {
  router.back();
};

const handleCreateProject = async () => {
  if (
    projectName.value !== "" &&
    projectMembers.value.length !== 0 &&
    projectDescription.value !== ""
  ) {
    const workspaceId = getWorkspaceIdFromCurrentURL(router);
    if (!workspaceId) return;
    const data = {
      workspaceId,
      projectName: projectName.value.trim(),
      projectMembers: projectMembers.value,
      projectDescription: projectDescription.value.trim(),
    };
    await addNewProject(data);
    router.back();
  }
};

const handleAddMembers = (event: any) => {
  if (event.key === "Enter" && member.value !== "") {
    if (!validateEmail(member.value)) return;
    const trimmedEmail = member.value.trim();
    if (!projectMembers.value.includes(trimmedEmail)) {
      projectMembers.value.push(trimmedEmail);
    }
    member.value = "";
  }
};


const handleRemoveMember = (member: string) => {
  const updateMembers = projectMembers.value.filter(
    (value) => value !== member
  );
  projectMembers.value = updateMembers;
};
</script>

<template>
  <Layout>
    <div
      class="flex items-center justify-center h-full"
      :class="{
        'bg-base-200 blur-sm': isSideMenuOpen,
      }"
    >
      <div class="h-auto w-4/5 bg-white border rounded-md mt-2 mb-2">
        <div class="flex items-center justify-between p-4 border-b">
          <span class="text-lg font-medium">Create project</span>
          <button class="rotate-45" @click="handleCloseModal">
            <IconPlus class="stroke-neutral" />
          </button>
        </div>
        <div class="flex flex-col items-center justify-around p-4 h-3/5">
          <div class="w-full pb-2">
            <input
              v-model="projectName"
              type="text"
              placeholder="Enter project name..."
              class="input rounded border border-base-200 w-full focus:outline-none"
            />
          </div>

          <div
            class="w-full h-auto overflow-hidden border border-base-200 px-2 py-2 rounded"
          >
            <div class="flex items-center justify-center flex-wrap">
              <div
                v-for="member in projectMembers"
                v-if="projectMembers.length !== 0"
                :key="member"
                class="flex items-center mr-2 mt-2 rounded bg-gray-100"
              >
                <span class="px-2 py-1.5">
                  {{ member }}
                </span>
                <button
                  class="flex items-center rotate-45"
                  @click="handleRemoveMember(member)"
                >
                  <IconPlus class="stroke-neutral" />
                </button>
              </div>
              <div class="mt-2 h-auto w-auto flex">
                <input
                  v-model="member"
                  @keydown.enter="handleAddMembers"
                  type="text"
                  placeholder="Enter email and Press Enter to add email member..."
                  class="input focus:outline-none py-1 pl-4 w-[410px]"
                />
              </div>
            </div>
          </div>
          <div class="w-full pt-2 h-auto">
            <textarea
              v-model="projectDescription"
              type="textarea"
              placeholder="Enter project description..."
              class="textarea textarea-lg w-full focus:outline-none rounded bg-gray-100"
            ></textarea>
          </div>
        </div>
        <div class="flex justify-end pb-4">
          <div>
            <button class="btn" @click="handleCloseModal">Cancel</button>
          </div>
          <div class="px-4">
            <button class="btn btn-primary" @click="handleCreateProject">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
