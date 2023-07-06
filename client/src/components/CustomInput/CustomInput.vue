<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, computed } from "vue";
import { useAuthStore } from "../../store/modules/auth";
import { storeToRefs } from "pinia";

const emits = defineEmits(["update:modelValue"]);

const { modelValue, name } = defineProps({
  modelValue: String,
  placeholder: String,
  name: String,
  type: {
    type: String,
    default: "text",
    validator: (value: string) =>
      ["text", "textarea", "password"].includes(value),
  },
});

const value = ref(modelValue);
watch(value, () => {
  emits("update:modelValue", value.value);
});
const auth = useAuthStore();
const { errorMessage, errorStatus } = storeToRefs(auth);
const focusedInput = ref("");

const isFocused = (name: string) => {
  if (focusedInput.value === name) return true;
};

const handleInputFocused = (inputName: string) => {
  focusedInput.value = inputName;
};

const isError = computed(() => {
  return errorStatus.value === 409 && isFocused(name as string) && name === 'Email'
})

const handleInputBlur = () => {
  focusedInput.value = "";
  if (errorStatus.value === 0 && errorMessage.value === "") return;
  errorStatus.value = 0;
  errorMessage.value = "";
};
</script>

<template>
  <label
    htmlFor="name"
    class="text-xs font-normal text-gray-600 pb-1 transition-all"
    :class="{
            'text-primary relative translate-x-3 translate-y-2 transition-all':
              isFocused(name as string),
          }"
  >
    <span
      class="bg-white"
      :class="{'text-error': isError}"
      >{{ name }}</span
    >
  </label>
  <input
    :type="type"
    :name="name"
    v-model="value"
    :placeholder="placeholder"
    @focus="handleInputFocused(name as string)"
    @blur="handleInputBlur"
    class="input input-primary border border-neutral-content w-full pl-4 py-3 rounded"
    :class="{
      'input-error border border-error':
        errorStatus === 409 && name === 'Email',
    }"
  />
</template>
