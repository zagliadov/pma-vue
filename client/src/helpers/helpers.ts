import axios from "axios";
import { API_URL } from "./constants";
import { type Router } from "vue-router";

export const getProjectIdFromCurrentPath = (router: Router): number => {
  const projectId = Number(router?.currentRoute?.value?.params?.project_id);
  return projectId;
};

export const getWorkspaceIdFromCurrentPath = (router: Router): number => {
  const workspaceId = Number(router?.currentRoute?.value?.params?.workspace_id);
  return workspaceId;
};

export const getEmailFromCurrentPath = (router: Router): string => {
  const email = String(router?.currentRoute?.value?.params?.email);
  return email;
};

export const parseUsernameFromEmail = (email: string): string | null => {
  const regex = /^(.*?)@/;
  const result = email.match(regex);
  if (result && result.length > 1) {
    return result[1];
  }
  return null;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const checkAuthentication = async () => {
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
    if (response.status === 200) return true;
  }
  return false;
};
