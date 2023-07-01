import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false);
  const user = ref(null);

  const isAuthenticated = computed(() => console.log(isLoggedIn));
  const currentUser = computed(() => console.log(user));

  const loginUser = async (email: string, password: string) => {
    try {
      console.log(email, password, "asd");
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };
  const registration = async (email: any) => {
    try {
      console.log(email);
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  };
});
