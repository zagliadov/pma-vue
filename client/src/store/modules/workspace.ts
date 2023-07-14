import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";

export const useWorkspaceStore = defineStore("workspace", () => {
  const workspaces = ref([]);
  const workspaceRegex = ref<RegExp>(/^[^\s][A-Za-z\s]{1,20}[^\s]$/);
  const errorMessage = ref<string>("");
  const errorStatus = ref<number>(0);
  const successStatus = ref<number>(0);

  const getWorkspaces = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post(
        `${API_URL}/workspace/get_workspaces`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      workspaces.value = response?.data?.workspaces;
    } catch (error) {
      console.log(error);
    }
  };

  const createWorkspace = async (workspaceName: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post(
        `${API_URL}/workspace/create_workspace`,
        { workspaceName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      successStatus.value = response?.status;
      workspaces.value = response?.data?.workspaces;
    } catch (error) {
      errorMessage.value = error?.response?.data?.message;
      errorStatus.value = error?.response?.status;
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
