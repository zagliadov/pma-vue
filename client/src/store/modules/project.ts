import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import { IProject } from "../interfaces";

interface IAddNewProjectData {
  workspaceId: number;
  projectName: string;
  projectMembers: string[];
  projectDescription: string;
}

export const useProjectStore = defineStore("project", () => {
  const projects = ref<IProject[]>([]);
  const isCreateProjectModal = ref<boolean>(false);

  const openCreateProjectModal = () => {
    isCreateProjectModal.value = !isCreateProjectModal.value;
  };

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
    isCreateProjectModal,
    openCreateProjectModal,
    getProjects,
    addNewProject,
  };
});
