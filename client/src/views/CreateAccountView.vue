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

const handleCreateAccount = async () => {
  if (username.value && workspace.value && email.value && password.value) {
    await auth.createAccount(
      username.value,
      workspace.value,
      email.value,
      password.value
    );
    username.value = "";
    workspace.value = "";
    email.value = "";
    password.value = "";
  }
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

        <CustomInput
          v-model="username"
          placeholder="Enter name"
          name="Username"
        />
        <div class="pt-4"></div>
        <CustomInput
          v-model="workspace"
          placeholder="Enter workspace"
          name="Workspace"
        />
        <div class="pt-4"></div>
        <CustomInput v-model="email" placeholder="Enter email" name="Email" />
        <span :class="{ 'text-error': errorStatus === 409 }">{{
          errorMessage
        }}</span>
        <div class="pt-4"></div>
        <CustomInput
          v-model="password"
          placeholder="Enter password"
          name="Password"
          type="password"
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
        <GoogleLoginButton> Sign up with Google </GoogleLoginButton>

        <div class="pt-4"></div>
        <AppleLoginButton> Sign up with Apple </AppleLoginButton>

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
