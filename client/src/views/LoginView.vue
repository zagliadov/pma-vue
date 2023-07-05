<script setup lang="ts">
import { useAuthStore } from "../store/modules/auth";
import { RouterLink } from "vue-router";
import GoogleLoginButton from "@/components/GoogleLoginButton/GoogleLoginButton.vue";
import AppleLoginButton from "@/components/AppleLoginButton/AppleLoginButton.vue";
import { ref } from "vue";

const { logIn } = useAuthStore();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  if (email.value && password.value) {
    logIn(email.value, password.value);
    email.value = "";
    password.value = "";
  }
  // Очистите значения полей формы после успешного входа
};
</script>
<template>
  <div className="flex justify-center h-screen w-screen">
    <div className="flex flex-col justify-center items-center">
      <div className="w-[464px] h-[512px] flex flex-col">
        <p className="text-2xl pb-8">Log in</p>
        <label
          htmlFor="email"
          className="text-xs font-normal text-gray-600 pb-1"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="Enter email"
          className="input input-bordered w-full pl-4 py-3 rounded"
        />

        <label
          htmlFor="password"
          className="text-xs font-normal text-gray-600 pb-1 pt-4"
        >
          Password
        </label>
        <input
          type="text"
          name="password"
          v-model="password"
          placeholder="Enter password"
          className="input input-bordered w-full pl-4 py-3 rounded"
        />
        <div className="relative">
          <span className="absolute text-red-500 text-xs left-[35%]"> </span>
        </div>

        <div className="flex items-center pt-4">
          <RouterLink
            to="/forgot_password"
            className="text-gray-600 font-medium text-xs hover:text-primary"
          >
            Forgot Password?
          </RouterLink>
        </div>

        <div className="pb-8"></div>
        <button @click="handleLogin" class="btn btn-primary rounded">
          Log in
        </button>
        <div className="pb-8"></div>

        <div className="flex item-center">
          <hr className="w-full border-neutral-content mt-2" />
          <span className="px-4 text-gray-400 text-xs font-normal">or</span>
          <hr className="w-full border-neutral-content mt-2" />
        </div>
        <div className="pt-4"></div>
        <GoogleLoginButton />

        <div className="pt-4"></div>
        <AppleLoginButton />

        <div className="pt-4">
          <span className="text-sm text-gray-600 font-normal">
            Don't have an account yet?
          </span>
          <RouterLink
            to="/create_account"
            className="text-gray-600 font-medium text-sm pl-2 hover:text-primary"
          >
            Create account
          </RouterLink>
        </div>
      </div>
    </div>
    <div className="bg-no-repeat bg-cover bg-gray-100"></div>
  </div>
</template>
