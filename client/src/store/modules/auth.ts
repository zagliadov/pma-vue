import { defineStore } from "pinia";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { ref } from "vue";
import { API_URL } from "../../helpers/constants";
import type { ICreateAccountRequest, IExistingUser } from "../interfaces";

export const useAuthStore = defineStore("auth", () => {
  const success = ref<boolean>(false);
  const existingUser = ref<IExistingUser | null>(null);
  const errorStatus = ref<number>(0);
  const errorMessage = ref<string>("");

  const logIn = async (email: string, password: string): Promise<void> => {
    try {
      const response: AxiosResponse<{
        errorMessage: string;
        errorStatus: string;
        token: string;
        existingUser: IExistingUser | null;
      }> = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const token: string = response?.data?.token;
        localStorage.setItem("token", token);
        success.value = true;
        existingUser.value = response.data?.existingUser;
      }
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        const message: string = error?.response?.data?.message || "";
        const status: number = error?.response?.status || 0;
        if (message && status) {
          errorMessage.value = message;
          errorStatus.value = status;
        }
      } else {
        throw new Error("Some server error occurred");
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
      await axios.post(`${API_URL}/auth/create_account`, requestData);
      success.value = true;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        errorStatus.value = error?.response?.status || 0;
        errorMessage.value = "User with this email already exists";
      } else {
        throw new Error("Some server error occurred");
      }
    }
  };

  const checkAuthentication = async (): Promise<boolean> => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      const response: AxiosResponse<{ existingUser: IExistingUser }> =
        await axios.post(
          `${API_URL}/auth/verify_token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      if (response.status === 200) {
        existingUser.value = response?.data?.existingUser;
        return true;
      } else {
        throw new Error("Some server error occurred");
      }
    }
    return false;
  };

  return {
    errorStatus,
    errorMessage,
    success,
    existingUser,
    logIn,
    createAccount,
    checkAuthentication,
  };
});
