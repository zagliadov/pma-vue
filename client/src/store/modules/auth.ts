import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
interface ICreateAccountRequest {
  username: string;
  workspace: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", () => {
  const username = ref("Daniil");
  const userDoesNotExist = ref(false);
  const success = ref(false);
  const errorStatus = ref(0);
  const errorMessage = ref("");

  const logIn = async (email: string, password: string): Promise<void> => {
    const response = await axios.post(
      "http://localhost:9002/auth/create_account",
      { email, password }
    );
  };

  const createAccount = async (
    username: string,
    workspace: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const requestData: ICreateAccountRequest = {
        username,
        workspace,
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:9002/auth/create_account",
        requestData
      );

      if (response.status === 201) success.value = true;
    } catch (error) {
      errorStatus.value = error?.response?.status || 0;
      errorMessage.value = "User with this email already exists";
    }
  };

  return {
    username,
    userDoesNotExist,
    logIn,
    errorStatus,
    errorMessage,
    createAccount,
    success,
  };
});
