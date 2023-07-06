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

const handleLogin = async () => {
  if (email.value && password.value) {
    await logIn(email.value, password.value);
    email.value = "";
    password.value = "";
  }
};
</script>
<template>
  <div class="flex justify-center h-screen w-screen">
    <div class="flex flex-col justify-center items-center">
      <div class="w-[464px] h-[512px] flex flex-col">
        <p class="text-2xl pb-8">Log in</p>
        <CustomInput v-model="email" placeholder="Enter email" name="Email" />
        <div class="pt-4"></div>
        <CustomInput v-model="password" placeholder="Enter password" name="Password" type="password" />

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
        <GoogleLoginButton>
          Log in with Google
        </GoogleLoginButton>

        <div class="pt-4"></div>
        <AppleLoginButton>
          Log in with Apple
        </AppleLoginButton>

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
