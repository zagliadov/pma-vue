<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";

const auth = useAuthStore();
const router = useRouter();
const { errorStatus, errorMessage, success } = storeToRefs(auth);
const username = ref("");
const workspace = ref("");
const email = ref("");
const password = ref("");
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
const handleCreateAccount = async () => {
  if (username.value && workspace.value && email.value && password.value) {
    await auth.createAccount(
      username.value,
      workspace.value,
      email.value,
      password.value
    );
  }
  username.value = "";
  workspace.value = "";
  email.value = "";
  password.value = "";
  if (success.value) {
    router.push("/login");
    success.value = false;
  }
};
</script>

<template>
  <div class="flex justify-center items-start h-screen w-screen">
    <div class="flex flex-col justify-center items-center">
      <div class="w-[464px] h-[512px] flex flex-col">
        <p class="text-2xl pb-8 pt-4">Create account</p>
        <label
          htmlFor="name"
          class="text-xs font-normal text-gray-600 pb-1 transition-all"
          :class="{
            'text-primary relative bg-white w-[62px] translate-x-3 translate-y-2 transition-all':
              isFocused('name'),
          }"
        >
          User name
        </label>
        <input
          type="text"
          name="name"
          v-model="username"
          @focus="handleInputFocused('name')"
          @blur="handleInputBlur"
          placeholder="Enter your name"
          class="input input-primary border border-neutral-content w-full pl-4 py-3 rounded"
        />

        <label
          htmlFor="workspace"
          class="text-xs font-normal text-gray-600 pb-1 pt-4 transition-all"
          :class="{
            'text-primary relative bg-white w-[98px] translate-x-3 translate-y-2 transition-all':
              isFocused('workspace'),
          }"
        >
          Workspace name
        </label>
        <input
          type="text"
          name="workspace"
          v-model="workspace"
          @focus="handleInputFocused('workspace')"
          @blur="handleInputBlur"
          placeholder="Enter your name"
          class="input input-primary border border-neutral-content w-full pl-4 py-3 rounded"
        />

        <label
          htmlFor="email"
          class="text-xs font-normal text-gray-600 pb-1 pt-4 transition-all"
          :class="{
            'text-primary relative bg-white w-[31px] translate-x-3 translate-y-2 transition-all':
              isFocused('email'),
            'text-error': errorStatus === 409 && isFocused('email'),
          }"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="Enter email"
          @focus="handleInputFocused('email')"
          @blur="handleInputBlur"
          :class="{ 'input-error border border-error': errorStatus === 409 }"
          class="input input-primary border border-neutral-content w-full pl-4 py-3 rounded"
        />
        <span :class="{ 'text-error': errorStatus === 409 }">{{
          errorMessage
        }}</span>

        <label
          htmlFor="password"
          class="text-xs font-normal text-gray-600 pb-1 pt-4"
          :class="{
            'text-primary relative bg-white w-[55px] translate-x-3 translate-y-2 transition-all':
              isFocused('password'),
          }"
        >
          Password
        </label>
        <input
          type="text"
          name="password"
          v-model="password"
          @focus="handleInputFocused('password')"
          @blur="handleInputBlur"
          placeholder="Enter Password"
          class="input input-primary border border-neutral-content w-full pl-4 py-3 rounded"
        />

        <div class="pb-8"></div>
        <button @click="handleCreateAccount" class="btn btn-primary rounded">
          Create account
        </button>

        <div class="flex item-center pt-4">
          <hr class="w-full border-neutral-content mt-2" />
          <span class="px-4 text-gray-400 text-xs font-normal">or</span>
          <hr class="w-full border-neutral-content mt-2" />
        </div>

        <div class="pb-4"></div>
        <button
          class="btn btn-outline-neutral-content flex justify-center items-center py-2.5 border border-neutral-content rounded"
        >
          <IconGoogle />
          <span class="font-medium text-base text-gray-600 pl-2">
            Sign up with Google
          </span>
        </button>

        <div class="pb-4"></div>
        <button
          class="btn btn-outline-neutral-content flex justify-center items-center py-2.5 border border-neutral-content rounded"
        >
          <IconApple />
          <span class="font-medium text-base text-gray-600 pl-2">
            Sign up with Apple
          </span>
        </button>

        <div class="pt-3"></div>
        <div>
          <span class="text-sm text-gray-600 font-normal">
            Already have an account?
          </span>
          <RouterLink
            to="/login"
            class="text-gray-600 font-medium hover:text-primary text-sm pl-2"
          >
            Log in
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
