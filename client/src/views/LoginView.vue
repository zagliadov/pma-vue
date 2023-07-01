<template>
  <main>
    <div class="w-[300px] h-[300px] border-2">
      <span>Login</span>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username</label>
          <input id="username" type="text" v-model="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" />
        </div>
        <button @click="handleLogin" type="submit">Login</button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/modules/auth";

defineProps<{
  msg: string;
}>();

import { ref } from "vue";
const store = useAuthStore();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  // await store.loginUser({ email: email.value, password: password.value });
  console.log(store);
  // Очистите значения полей формы после успешного входа
  email.value = "";
  password.value = "";
};
</script>
