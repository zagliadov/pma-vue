<script setup lang="ts">
import { capitalizeFirstLetter } from "../../../helpers/helpers";
import { useAssigneeStore } from "../../../store/modules/assignee";
import { API_URL } from "../../../helpers/constants";
import { ref } from "vue";

const assigneeStore = useAssigneeStore();
const hoveredMember = ref<string | null>(null);
</script>

<template>
  <div
    v-for="{
      email,
      avatar_filename,
      firstName,
      lastName,
    } in assigneeStore.members"
    class="flex items-center justify-between rounded p-2 mt-4 hover:bg-base-200"
    @mouseenter="hoveredMember = email"
    @mouseleave="hoveredMember = null"
  >
    <div className="flex items-center">
      <div
        :style="{
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundImage: avatar_filename
            ? `url(${API_URL}/user/user_avatar/${avatar_filename})`
            : 'none',
        }"
        class="flex items-center justify-center w-10 h-10 border rounded-full bg-neutral-content"
      >
        <span v-if="!avatar_filename">
          {{ capitalizeFirstLetter(email) }}
        </span>
      </div>
      <span class="pl-5">{{ firstName || email }} {{ lastName || "" }}</span>
    </div>

    <button v-if="hoveredMember === email">
      <IconClose />
    </button>
  </div>
</template>
