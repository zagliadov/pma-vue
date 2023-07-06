import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

const SERVER = "http://localhost:9002";
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
    try {
      const response = await axios.post(
      `${SERVER}/auth/login`,
      { email, password }
    );

    console.log(response);
    } catch (error) {
      const message = error?.response?.data?.message;
      const status = error?.response?.status;
      if (message && status) {
        errorMessage.value = message;
        errorStatus.value = status;
      }
    }
    
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
        `${SERVER}/auth/create_account`,
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
