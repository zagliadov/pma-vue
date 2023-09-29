<script setup lang="ts">
import { API_URL } from "../../../helpers/constants";
import { capitalizeFirstLetter } from "../../../helpers/helpers";
import { useProjectStore } from "../../../store/modules/project";
import { ref, computed } from "vue";

const projectStore = useProjectStore();
const assigneeArray = ref<any>(
  projectStore?.project?.projectAssignees &&
    projectStore?.project?.projectAssignees?.length > 3
    ? projectStore?.project?.projectAssignees.slice(0, 3)
    : projectStore?.project?.projectAssignees.slice()
);

const lengthDifference = computed(
  () =>
    projectStore?.project?.projectAssignees &&
    projectStore?.project?.projectAssignees?.length - assigneeArray.value.length
);
</script>

<template>
  <div className="flex items-center pl-10">
    <div v-for="(assignee, index) in assigneeArray" :key="assignee.id">
      <div
        :style="{
          position: 'relative',
          marginLeft: index === 0 ? '0px' : `${index - 20}px`,
          zIndex: `${index + 2}`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundImage: assignee?.avatar_filename
            ? `url(${API_URL}/user/user_avatar/${assignee?.avatar_filename})`
            : 'none',
        }"
        class="flex items-center justify-center w-10 h-10 border rounded-full bg-white"
      >
        <span>
          {{
            !assignee?.avatar_filename
              ? capitalizeFirstLetter(assignee?.email)
              : ""
          }}
        </span>
      </div>
    </div>
    <div
      class="flex items-center justify-center w-10 h-10 border rounded-full bg-white ml-[-15px] z-10"
    >
      <span>+ {{ lengthDifference }}</span>
    </div>
  </div>
</template>
