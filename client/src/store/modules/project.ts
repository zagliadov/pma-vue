import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import { IProject } from "../interfaces.ts";

export const useProjectStore = defineStore("project", () => {
  const projects = ref<IProject[]>([]);

  const getProjects = async (workspaceId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post(
        `${API_URL}/project/get_projects`,
        { workspaceId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      projects.value = response?.data?.projects;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    projects,
    getProjects,
  };
});
