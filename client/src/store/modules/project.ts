import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import { IProject, IAddNewProjectData } from "../interfaces";


export const useProjectStore = defineStore("project", () => {
  const projects = ref<IProject[]>([]);
  const assigneeProjects = ref<any>([]);

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
      assigneeProjects.value = response?.data?.projectAssignees;
      console.log(response.data);
      projects.value = response?.data?.projects;
    } catch (error) {
      console.log(error);
    }
  };

  const addNewProject = async (data: IAddNewProjectData): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post(
        `${API_URL}/project/add_new_project`,
        data,
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
    assigneeProjects,
    getProjects,
    addNewProject,
  };
});
