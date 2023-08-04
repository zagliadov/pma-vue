import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { API_URL } from "../../helpers/constants";
import { IProject, IAddNewProjectData } from "../interfaces";

export const useProjectStore = defineStore("project", () => {
  const projects = ref<IProject[]>([]);
  const project = ref<IProject>();

  const getProjects = async (workspaceId: number): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post<{ projects: IProject[] }>(
        `${API_URL}/project/get_projects`,
        { workspaceId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        projects.value = response.data.projects;
      } else {
        console.log("Failed to get projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (projectId: number): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post<{ project: IProject }>(
        `${API_URL}/project/get_project`,
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        project.value = response.data.project;
      } else {
        console.log("Failed to get project");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewProject = async (data: IAddNewProjectData): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post<{ projects: IProject[] }>(
        `${API_URL}/project/add_new_project`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        projects.value = response.data.projects;
      } else {
        console.log("Failed to get projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    projects,
    project,
    getProjects,
    getProject,
    addNewProject,
  };
});
