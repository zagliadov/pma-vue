<script setup lang="ts">
import { API_URL } from "@/helpers/constants";
import { capitalizeFirstLetter } from "@/helpers/helpers";

const { assignee, index } = defineProps(["assignee", "index"]);
</script>

<template>
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
        !assignee?.avatar_filename ? capitalizeFirstLetter(assignee?.email) : ""
      }}
    </span>
  </div>
</template>
