<script setup lang="ts">
const props = defineProps(['name', 'email']);
console.log(props)
import { ref } from "vue";
import { useAuthStore } from "../../store/modules/auth";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { errorMessage, errorStatus } = storeToRefs(auth);
const focusedInput = ref("");

const isFocused = (name: string) => {
  if (focusedInput.value === name) return true;
};

const handleInputFocused = (inputName: string) => {
  focusedInput.value = inputName;
};
const handleInputBlur = () => {
  focusedInput.value = "";
  if (errorStatus.value === 0 && errorMessage.value === "") return;
  errorStatus.value = 0;
  errorMessage.value = "";
};
</script>

<template>
  <label
    htmlFor="props.name"
    class="text-xs font-normal text-gray-600 pb-1"
    :class="{
      'text-primary translate-x-3 relative translate-y-2 transition-all':
        isFocused(props.name),
    }"
  >
    <span class="bg-white">{{ props.name }}</span>
  </label>
  <input
    type='props.name'
    name='props.name'
    v-model="props.email"
    :placeholder="'Enter ' + props.name"
    @focus="handleInputFocused(props.name)"
    @blur="handleInputBlur"
    class="input input-primary border border-neutral-content w-full pl-4 py-3 rounded"
  />
</template>
