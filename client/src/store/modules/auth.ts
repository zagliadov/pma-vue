import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { API_URL } from "../../helpers/constants";

interface ICreateAccountRequest {
  username: string;
  workspace: string;
  email: string;
  password: string;
}
interface IProject {
  id: number;
  name: string;
  description: string;
  workspaceId: number;
  tasks: any;
  projectAssignees: any;
}
interface IWorkspace {
  id: number;
  name: string;
  authorId: number;
  projects: IProject[];
}
interface IExistingUser {
  avatar_filename: string | null;
  id: number;
  name: string;
  email: string;
  password: string;
  workspace: IWorkspace[];
}
export const useAuthStore = defineStore("auth", () => {
  const success: boolean = ref(false);
  const existingUser: IExistingUser = ref(null);
  const errorStatus: number = ref(0);
  const errorMessage: string = ref("");

  const uploadPhoto = async (file: any) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      console.log("UPLOAD");
      const response = await axios.post(
        `${API_URL}/user/upload_photo`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const token = response?.data?.token;
        localStorage.setItem("token", token);
        success.value = true;
        existingUser.value = response.data?.existingUser;
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      const status = error?.response?.status || 0;
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
        `${API_URL}/auth/create_account`,
        requestData
      );

      if (response.status === 201) success.value = true;
    } catch (error) {
      errorStatus.value = error?.response?.status || 0;
      errorMessage.value = "User with this email already exists";
    }
  };

  const checkAuthentication = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(
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
      }
    }
    return false;
  };

  return {
    logIn,
    errorStatus,
    errorMessage,
    createAccount,
    success,
    existingUser,
    checkAuthentication,
    uploadPhoto,
  };
});
