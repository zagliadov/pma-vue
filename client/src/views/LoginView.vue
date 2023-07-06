<script setup lang="ts">
import { useAuthStore } from "../store/modules/auth";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const auth = useAuthStore();
const { logIn } = auth;
const { errorStatus, errorMessage, success } = storeToRefs(auth);
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
const handleLogin = async () => {
  if (email.value && password.value) {
    await logIn(email.value, password.value);
    email.value = "";
    password.value = "";
  }
  // Очистите значения полей формы после успешного входа
};
</script>
<template>
  <div class="flex justify-center h-screen w-screen">
    <div class="flex flex-col justify-center items-center">
      <div class="w-[464px] h-[512px] flex flex-col">
        <p class="text-2xl pb-8">Log in</p>
        <CustomInput name="Email" :email='email'/>
        <!-- <label
          htmlFor="email"
          class="text-xs font-normal text-gray-600 pb-1"
          :class="{
            'text-primary translate-x-3 relative translate-y-2 transition-all':
              isFocused('email'),
          }"
        >
          <span class="bg-white">Email</span>
        </label>
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="Enter email"
          @focus="handleInputFocused('email')"
          @blur="handleInputBlur"
          class="input input-primary border border-neutral-content w-full pl-4 py-3 rounded"
        /> -->

        <label
          htmlFor="password"
          class="text-xs font-normal text-gray-600 pb-1 pt-4"
        >
          Password
        </label>
        <input
          type="text"
          name="password"
          v-model="password"
          placeholder="Enter password"
          class="input input-primary border border-neutral-content w-full pl-4 py-3 rounded"
        />
        <div class="relative">
          <span class="absolute text-red-500 text-xs left-[35%]"> </span>
        </div>

        <div class="flex items-center pt-4">
          <RouterLink
            to="/forgot_password"
            class="text-gray-600 font-medium text-xs hover:text-primary"
          >
            Forgot Password?
          </RouterLink>
        </div>

        <div class="pb-8"></div>
        <button @click="handleLogin" class="btn btn-primary rounded">
          Log in
        </button>
        <div class="pb-8"></div>

        <div class="flex item-center">
          <hr class="w-full border-neutral-content mt-2" />
          <span class="px-4 text-gray-400 text-xs font-normal">or</span>
          <hr class="w-full border-neutral-content mt-2" />
        </div>
        <div class="pt-4"></div>
        <GoogleLoginButton />

        <div class="pt-4"></div>
        <AppleLoginButton />

        <div class="pt-4">
          <span class="text-sm text-gray-600 font-normal">
            Don't have an account yet?
          </span>
          <RouterLink
            to="/create_account"
            class="text-gray-600 font-medium text-sm pl-2 hover:text-primary"
          >
            Create account
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
