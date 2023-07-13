import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";

export const useWorkspaceStore = defineStore("workspace", () => {
  const workspace = ref([]);
  const workspaceRegex = ref<RegExp>(/^[^\s][A-Za-z\s]{1,20}[^\s]$/);

  const createWorkspace = async (name: string) => {
    console.log(name, 'service');
  };



  return {
    workspace,
    workspaceRegex,
    createWorkspace,
  };
});
