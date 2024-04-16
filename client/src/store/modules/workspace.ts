import { defineStore } from "pinia";
import { ref } from "vue";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { API_URL } from "../../helpers/constants";
import type { IWorkspace } from "../interfaces.ts";
import * as _ from "lodash";
import { RouteTypeKeys } from "@/types";

export const useWorkspaceStore = defineStore("workspace", () => {
  const workspaces = ref<IWorkspace[]>([]);
  const workspaceRegex = ref<RegExp>(/^[^\s][A-Za-z\s]{1,20}[^\s]$/);
  const errorMessage = ref<string>("");
  const errorStatus = ref<number>(0);
  const successStatus = ref<number>(0);

  /**
   * Retrieves a list of workspaces associated with the authenticated user.
   *
   * @throws {Error} If the user is not authenticated, the request fails, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves with the list of workspaces.
   */
  const getWorkspaces = async (): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{ workspaces: IWorkspace[] }> =
        await axios.post(
          `${API_URL}/${RouteTypeKeys.WORKSPACES}/${RouteTypeKeys.GET_WORKSPACES}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      workspaces.value = _.get(response, "data.workspaces");
      console.log(
        "Successfully retrieved a list of workspaces associated with the authenticated user."
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to get workspaces:");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  /**
   * Creates a new workspace with the specified name for the authenticated user.
   *
   * @param {string} workspaceName - The name of the new workspace to be created.
   * @throws {Error} If the user is not authenticated, the request fails, or a server error occurs.
   * @returns {Promise<void>} A Promise that resolves once the workspace is successfully created.
   */
  const createWorkspace = async (workspaceName: string): Promise<void> => {
    const token: string | null = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated");
    try {
      const response: AxiosResponse<{ workspaces: IWorkspace[] }> =
        await axios.post(
          `${API_URL}/${RouteTypeKeys.WORKSPACES}/${RouteTypeKeys.CREATE_WORKSPACE}`,
          { workspaceName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      successStatus.value = _.get(response, "status");
      workspaces.value = _.get(response, "data.workspaces");
      console.log(
        "Successfully created a new workspace with the specified name for an authenticated user."
      );
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error);
        throw new Error("Failed to create workspaces:");
      } else {
        console.error("Server error:", error);
        throw new Error("Some server error occurred.");
      }
    }
  };

  return {
    workspaces,
    workspaceRegex,
    errorMessage,
    errorStatus,
    successStatus,
    createWorkspace,
    getWorkspaces,
  };
});
