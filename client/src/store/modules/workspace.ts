import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";

export const useWorkspaceStore = defineStore("workspace", () => {
  const workspace = ref([]);
  const workspaceRegex = ref<RegExp>(/^[^\s][A-Za-z\s]{1,20}[^\s]$/);
  const errorMessage = ref<string>("");
  const errorStatus = ref<number>(0);
  const successStatus = ref<number>(0);

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
      console.log(response, "response");
      successStatus.value = response?.status;
    } catch (error) {
      errorMessage.value = error?.response?.data?.message;
      errorStatus.value = error?.response?.status;
    }
  };

  return {
    workspace,
    workspaceRegex,
    errorMessage,
    errorStatus,
    successStatus,
    createWorkspace,
  };
});
