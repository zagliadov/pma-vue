import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";

export const useWorkspaceStore = defineStore("workspace", () => {
  const workspace = ref([]);
  const workspaceRegex = ref<RegExp>(/^[^\s][A-Za-z\s]{1,20}[^\s]$/);

  const createWorkspace = async (workspaceName: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await axios.post(
      `${API_URL}/workspace/create_workspace`,
      { workspaceName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return {
    workspace,
    workspaceRegex,
    createWorkspace,
  };
});
