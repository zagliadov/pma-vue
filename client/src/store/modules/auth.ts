import { defineStore } from "pinia";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { ref } from "vue";
import { API_URL } from "../../helpers/constants";
import type { ICreateAccountRequest, IExistingUser } from "../interfaces";
import * as _ from "lodash";
import { RouteTypeKeys } from "@/types";

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
      }> = await axios.post(
        `${API_URL}/${RouteTypeKeys.AUTH}/${RouteTypeKeys.LOGIN}`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        const token: string = _.get(response, "data.token");
        localStorage.setItem("token", token);
        success.value = true;
        existingUser.value = _.get(response, "data.existingUser");
      }
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        const message: string = _.get(error, "response.data.message", "");
        const status: number = _.get(error, "response.status", 0);
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
      await axios.post(
        `${API_URL}/${RouteTypeKeys.AUTH}/${RouteTypeKeys.CREATE_ACCOUNT}`,
        requestData
      );
      success.value = true;
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        errorStatus.value = _.get(error, "response.status", 0);
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
          `${API_URL}/${RouteTypeKeys.AUTH}/${RouteTypeKeys.VERIFY_TOKEN}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      if (response.status === 200) {
        existingUser.value = _.get(response, "data.existingUser");
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
